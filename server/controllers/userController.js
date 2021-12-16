import { compare } from 'bcryptjs'
import User from '../models/userModel'
import { isEmail } from 'validator'
import {
	catchAsync,
	appError,
	setToken,
	getIdFromToken,
	filterObjectWithAllowedArray,
	sendMail
} from '../util'


import cloudinary from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})




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

	// 3. check user update password or not, if do then force to re-login
	const token = setToken(user._id)

	res.status(200).json({
		status: 'success',
		token 		// user only need token that's it
	})
})




/* userReducer.js  > /api/users/signup.js	:	handler.post(login)
 		.	/pages/login.js */
export const signup = catchAsync(async (req, res, next) => {
	// 1. filter out un wanted fields
	const allowedFields = ['username', 'email', 'password', 'confirmPassword', 'avatar']
	const body = filterObjectWithAllowedArray(req.body, allowedFields)

	// 2. check extra staff
	// allowedFields.forEach(item => {
	// 	if(!body[item]) throw next(appError(`${item} field is empty`))
	// })
	allowedFields.forEach(item => {
		if(!body[item]) throw next(appError(`${item} field is empty`))
	})

	// 5. upload image in cloudinary
	const { public_id, secure_url } = await cloudinary.v2.uploader.upload(body.avatar, {
		folder: 'next-amazona/users'
	})
	body.avatar = { public_id, secure_url } 		// body => { ..., avatar: {public_id, secure_url } }

	// 3. password will be hashed before save by pre('save') hook
	// 4. save to database
	const user = await User.create(body)
	if(!user) return next(appError('data can\' be save into database'))

	user.password = undefined 	// Don't send hashed password to user

	res.status(200).json({
		status: 'success',
		user
	})
})



/* userReducer.js  > /api/users/index.js	:	handler.get(userController.getAllUser)
 		//.	/pages/user/profile.js */
export const getAllUser = catchAsync(async(req, res, next) => {
	// const { id } = req.params
	const users = await User.find()

	res.status(200).json({
		status: 'success',
		totalUsers: users?.length,
		users,
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




// only for testing purpose, not connected with project
export const uploadImage = catchAsync( async (req, res, next) => {
	const { file } = req.body

	const data = await cloudinary.v2.uploader.upload(file, {
		folder: 'next-amazona/users'
	})

	res.status(200).json({
		status: 'success',
		doc: data
	})
})
