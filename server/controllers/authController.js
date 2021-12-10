import crypto from 'crypto'

import { catchAsync, getIdFromToken, setToken, appError, sendMail } from '../util'
import User from '../models/userModel'







/* protect middleware used with:
	. /api/users/me.js								:	handler.get(protect, getUser)
	. /api/users/forgot-password/ 		: handler.patch(protect, resetPassword)
*/
export const protect = catchAsync(async(req, res, next) => {
	/* 1. Get Token: Token may comes form
				1. browser Cookie automatically or
				2. user set manually as cookie or bearer token or
				3. user send with body: required for reset password based on token */
	let token = req.headers.cookie?.split('=').pop()  						// from browser  or user send 	{ headers: {cookie: token} }
	    token = token || req.headers.authorization?.split('Bearer ').pop() 	// 	{ headers: { Authorization: `Bearer ${token}`}}
	    token = token || req.body.token  																		// { username: 'riajul', token: 'eyJhbGciOiJIUzI1...'}

	if(!token) return next(appError('Please send token as header or body', 401))

	// 2. Get id from token
	const { _id, iat } = getIdFromToken(token)

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



/* userReducer.js  > /pages/api/users/me.js	:	handler.get(protect, getMe)
 		.	/layout/index.js */
export const getMe = (req, res, next) => {

	res.status(200).json({
		status: 'success',
		user: req.user
	})
}


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
