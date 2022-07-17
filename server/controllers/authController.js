import path from 'path'
import fs from 'fs'
import { promisify } from 'util'
import crypto from 'crypto'
import bcript from 'bcryptjs'
import User from '../models/userModel'

import { parse } from 'cookie'

import { 
	catchAsync, 
	getIdFromToken, 
	setToken, 
	appError, 
	sendMail, 
	filterObjectWithExcludedArray, 
	uploadImage, 
	uploadPdf
} from '../util'


import cloudinary from 'cloudinary'
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})


const PUBLIC_ROOT = path.join(__dirname, '../../../../../public')




/* protect middleware used with:
	. /api/users/me.js								:	handler.get(protect, getUser)
	. /api/users/forgot-password/ 		: handler.patch(protect, resetPassword) */
export const protect = catchAsync(async(req, res, next) => {
	/* 1. Get Token: Token may comes form
				1. Browser Cookie automatically 									: For Web Appication
				2. user set manually as header as Bearer token 		: For Mobile Application

	/*
		const token =  req.headers.authorization?.split('Bearer ').pop() 	
			// axios.get('/api/users/me', { headers: { Authorization: `Bearer ${token}`}})
	*/

	const { token } = parse(req.headers.cookie || '')
	// console.log({ token })


	// const { token } = parse(req.headers?.cookie || '')
	if(!token) return next(appError('Please send token as cookie', 401))

	// 2. Get id from token
	const { _id, iat } = getIdFromToken(token)
	// console.log({ userId: _id })

	// 3. Get user by id
	const user = await User.findById(_id)
	if(!user) return next(appError('Please login first', 401))

	/* 4. check is user update password ?
		How do we check is password updated or not ?
			if we create token before password change, then token iat always will be
			less than user.passwordChangedAt property, on the other hand passwordChangedAt property
			eighter not exist if any time user did not update password. or passwordChangedAt will be
			greater than token iat time, because which one will created first will be less timestamp */

	let updateTime = user.passwordChangedAt 	// timpstamp When user change password
	    updateTime = new Date(updateTime) 		// => String => Date
	    updateTime = updateTime.getTime() 		// => time in Number <= Date

	let tokenTime = iat * 1000 								// => in second so convert to miliSeconds, because updateTime in miliSeconds
	const isPasswordChangedAfterLogin = tokenTime < updateTime

	if(isPasswordChangedAfterLogin) return next(appError('Please relogin, password changed', 403))

	req.user = user
	next()
})



export const uploadAvatar = async (req, res, next) => {
	const { avatar } = req.body || {}

	// Step-1: only used if avatar available
	if(!avatar) return next()

	// Step-2: Upload avatar and Replace avatar.secure_url with uploaded image url
	const { image } = await uploadImage(avatar, `${PUBLIC_ROOT}/images/users`)
	req.body.avatar = image 	// body get updated avatar with image url

	// Step-3: Delete old image
	const oldImage = path.join(PUBLIC_ROOT, req.user.avatar.secure_url)
	fs.exists( oldImage, (isExist) => isExist && promisify(fs.unlink)(oldImage))

	next()
}

export const uploadResume = async (req, res, next) => {
	const { resume } = req.body || {}

	// Step-1: only used if resume available
	if(!resume) return next()

	// Step-2: Upload resume and Replace resume.secure_url with uploaded file url
	const { file } = await uploadPdf(resume, `${PUBLIC_ROOT}/files`)
	req.body.resume = file

	// Step-3: Delete old image
	const oldResume = path.join(PUBLIC_ROOT, req.user.resume?.secure_url)
	fs.exists( oldResume, (isExist) => isExist && promisify(fs.unlink)(oldResume))

	next()
}

/* userReducer.js  > /pages/api/users/me.js	:	handler.get(protect, getMe)
 		.	/layout/index.js */
export const getMe = (req, res, next) => {

	res.status(200).json({
		status: 'success',
		user: req.user
	})
}


// const excludedFields = [ 
// 	'role', 
// 	'_id', 
// 	'password', 
// 	'email', 
// 	'avatar', 
// 	'passwordResetToken', 
// 	'passwordResetExpires', 
// 	'passwordChangedAt'
// ]

/* userReducer.js  > /pages/api/users/me.js	:	handler.patch(protect, updateMe)
 		// .	/layout/index.js */
export const updateMe = async (req, res, next) => {
	try {
		if(req.body.password) return next(appError('Please use /user/update-my-password route'))
		if(req.body.email) return next(appError('You can\'t change login email'))

		// const data = filterObjectWithExcludedArray(req.body, excludedFields )
		// console.log(req.body)

		// 2. save to database
		const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true })
		if(!user) return next(appError('User can\'t update.', 500))

		res.status(201).json({ status: 'success', user })

	} catch (err) {

		// 1. Get image path which we set in step (3) after image uploaded
		const destination = path.join(PUBLIC_ROOT, req.body.avatar.secure_url)

		// 2. check if file exists then try to remove image
		fs.exists(destination, (isExist) => isExist && promisify(fs.unlink)(destination))

		// 3. Close Request-Response-circle with sending error message
		next(appError(err.message))
	}
}

/* userReducer.js  > /pages/api/users/update-my-password.js	:	handler.patch(protect, updateMyPassword)
 		.	/user/update-my-password.js */
export const updateMyPassword = catchAsync( async (req, res, next) => {
	const { currentPassword, password, confirmPassword } = req.body

	if(!currentPassword) return next(appError('currentPassword field is empty'))
	if(currentPassword === password) return next(appError('Please asign new password'))


	const user = await User.findById(req.user._id).select('+password')

	// user password, hashedPassword
	const isAuthenticated = await bcript.compare(currentPassword, user.password)
	if(!isAuthenticated) return next(appError('your currentPassword is incorrect'))

	// save so that password hashed by pre() hook
	user.password = password
	user.confirmPassword = confirmPassword
	user.passwordChangedAt = new Date() 				// this line expire old token in 	protect() middleware
	const updatedUser = await user.save({ validateBeforeSave: true })

	res.status(201).json({
		status: 'success',
		message: 'Password Update Successful, please re-loagin'
	})
})



/* userReducer.js  > /pages/api/users/forgot-password.js	:	handler.post(forgotPassword)
 		.	/pages/users/forgot-password.js */
export const forgotPassword = catchAsync( async(req, res, next) => {
	const { email } = req.body

	if(!email) return next(new AppError('Please add Email address first', 404));

	const user = await User.findOne({ email })
	if(!user) return next(appError('this email is not registerted', 403))

	const passwordResetToken = user.passwordResetToken = setToken(user._id)
	user.passwordResetExpires = Date.now() + 1000 * 60 * 10 								// 10 minute

	const updatedUser = await user.save({ validateBeforeSave: false })
	if(!updatedUser) return next(appError('Database Operation failed: Sorry token can\'t save in database', 400))

	try {
		await sendMail({
			from: 'robitops10@gmail.com',
			to: user.email,
			subject: 'PasswordResetToken',
			text: passwordResetToken
		})

		res.status(201).json({
			status: 'success',
			message: 'password reset token sent to your email'
		})

	} catch (err) {
		user.passwordResetToken = undefined
		user.passwordResetExpires = undefined
		await user.save({ validateBeforeSave: false })

		return next(appError('Probably Problem in SendMail credientials, check it out', 403))
	}
})


/* userReducer.js  > /pages/api/users/forgot-password.js	:	handler.patch(protect, resetPassword)
 		.	/pages/users/forgot-password.js */
export const resetPassword = catchAsync( async(req, res, next) => {
	const { token: passwordResetToken, password, confirmPassword } = req.body

	if(!passwordResetToken) return next(appError('Token field can\'t be empty'))
	if(!password) return next(appError('New password field can\'t be empty'))
	if(!confirmPassword) return next(appError('confirmPassword field can\'t be empty'))

	const user = req.user 	// comes from protect middleware


	if(new Date(user.passwordResetExpires) < new Date()) {
		return next(appError('token expires, please retry again', 403))
	}

	user.passwordResetToken = undefined
	user.passwordResetExpires = undefined

	user.password = password
	user.confirmPassword = confirmPassword

	// to expire old token, and generate new token
	user.passwordChangedAt = new Date()
	await user.save() 	// it has all the required fields to of schema

	res.status(201).json({
		status: 'success',
		message: 'success',
		user: user
	})
})




