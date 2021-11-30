import crypto from 'crypto'

import { catchAsync, getIdFromToken, setToken, appError, sendMail } from '../util'
import User from '../models/userModel'








// Token must be come from header or body
export const protect = catchAsync(async(req, res, next) => {
	const authorization = req.headers.authorization
	const token = authorization?.split('Bearer ').pop() || req.body.token

	if(!token) return next(appError('Please send token as header or body', 401))
	const { _id, iat } = getIdFromToken(token)

	const user = await User.findById(_id)
	if(!user) return next(appError('Please login first', 401))

	req.user = user

	next()
})



// const createPasswordResetToken = () => {
// 	let resetToken = crypto.randomBytes(32).toString('hex') 							// Generate Random value
// 			resetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

// 	// const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

// 	// this.passwordResetToken = await bcrypt.hash(resetToken, 2)
// 	// this.passwordResetExpires = Date.now() + 1000 * 60 * 10 								// 10 minute
// 	// this.save({validateBeforeSave: false}) 																// save the document after modify

// 	return resetToken
// }
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


// handler.patch(protect, resetPassword) 	=> axios.patch(`/api/users/forgot-password/`, obj)
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
