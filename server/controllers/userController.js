import path from 'path'
import fs from 'fs'
import { promisify } from 'util'
import { compare } from 'bcryptjs'
import User from '../models/userModel'
import { isEmail } from 'validator'
import {
	catchAsync,
	appError,
	setToken,
	getIdFromToken,
	filterObjectWithAllowedArray,
	sendMail,
	apiFeatures,
	uploadImage
} from '../util'


import cloudinary from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})


const PUBLIC_ROOT = path.join(__dirname, '../../../../../public')


/* userReducer.js  > /pages/api/users/login.js	:	handler.post(login)
 		.	/pages/login.js */
export const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body

	// 1. match email with user email
	const user = await User.findOne({ email }).select('+password')
	if(!user) return next(appError('Please sign up first'))

	// 2. check password
	const authenticated = await compare(password, user.password )
	if(!authenticated) return next(appError('Email or password is incorrect'))

	// 3. if user disabled/delete his account then force user to active it first
	if(!user.active) return next(appError('Plase active your account first.'))


	// 4. check user update password or not, if do then force to re-login

	// 4. Set Token as Cookie
	const token = setToken(user._id)
	const expires = new Date(Date.now() + 1000*60*60*24*30)
	res.setHeader('set-Cookie', `token=${token}; path=/; httpOnly; secure; expires=${expires}`)

	// 5. Send Response back
	res.status(200).json({ status: 'success' })
})




/* userReducer.js  > /api/users/signup.js	:	handler.post(login)
 		.	/pages/signup.js */
export const signup = async (req, res, next) => {
	try {

	// 1. filter out un wanted fields
	const allowedFields = ['name', 'email', 'password', 'confirmPassword', 'avatar']
	const body = filterObjectWithAllowedArray(req.body, allowedFields)

	// 2. check extra staff
	allowedFields.forEach(item => {
		if(!body[item]) throw next(appError(`${item} field is empty`))
	})

	// 3. Save image to /public/images/users/
	const saveToDir = path.join(PUBLIC_ROOT, '/images/users')
	const { error, image } = await uploadImage(body.avatar, saveToDir, [100, 100] )

	// N-1: last extep, to remove image, if throw error after image upload
	req.body.avatar = image.secure_url 		

	// throw new Error('server failed')

	// 4. save to database
	const user = await User.create({ ...body, avatar: image })
	if(!user) return next(appError('signup failed, data not saved into mongoDB'))

	res.status(201).json({
		status: 'success',
		message: 'Sign up is successfull'
	})

	} catch (err) {

		// 1. Get image path which we set when image uploaded
		const destination = path.join(PUBLIC_ROOT, req.body.avatar)

		// 2. check if file exists then try to remove image
		fs.exists(destination, (isExist) => isExist && promisify(fs.unlink)(destination))

		// 3. Close Request-Response-circle with sending error message
		next(appError(err.message))
	}

}



/* userReducer.js  > /api/users/index.js	:	handler.get(userController.getAllUsers)
 		/pages/user/dashboard.js  => /components/dashboard/customer/view.js */
export const getAllUsers = catchAsync(async(req, res, next) => {
	const limit = +req.query.limit || 4

	const totalDocuments = await User.countDocuments()
	// const users = await User.find()
	const users = await apiFeatures(User, req.query)
		.pagination()
		.sort()
		.search()
		.filter()
		.query

	const countPage = Math.ceil( totalDocuments / limit )

	// console.log({ totalDocuments, limit, countPage })

	res.status(200).json({
		status: 'success',
		total: users?.length,
		users,
		countPage
	})
})



/* userReducer.js  > /api/users/[id].js	:	handler.get(userController.getUserById)
 		//.	/pages/user/profile.js */
export const getUserById = catchAsync(async(req, res, next) => {
	const { id } = req.query

	const user = await User.findById(id)
	if(!user) return next(appError('No user Found', 404))

	res.status(200).json({
		status: 'success',
		user
	})
})



/* userReducer.js  > /api/users/send-mail.js	:	handler.post(protect, userMailTo)
 		/components/dialog/profile/sendMail.js */
export const userMailTo = catchAsync(async(req, res, next) => {
	let { email, subject, message, file } = req.body

	if(!isEmail(email)) return next(appError('Receipence must be valid email address'))
	if(!subject || !message) return next(appError('subject or message field empty'))

	message = message
	if(file) message = `${message} \bfile: ${file}`


	try {
		await sendMail({ from: req.user.email, to: email, subject, message })
		res.status(200).json({
			status: 'success',
			message: 'mail is sent successfully'
		})

	} catch(err) {
		throw next(appError(err.message, 403))
	}

})




export const deleteMe = catchAsync(async(req, res, next) => {
	const { email, password } = req.body

	const user = await User.findOne({ email }).select('+password')
	if(!user) return next(appError('You are not validated user', 403))

	const authenticated = await compare(password, user.password)
	if(!authenticated) return next(appError('Password not matched', 403))

	const newUser = await User.findByIdAndUpdate(user._id, { active: false }, { new: true, runValidators: true })
	// console.log(newUser)

	setTimeout(() => {

	res.status(200).json({
		status: 'success',
		// user,
		// user: newUser
	})
	}, 2000)
})



