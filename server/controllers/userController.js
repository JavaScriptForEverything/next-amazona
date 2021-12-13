import { compare } from 'bcryptjs'
import User from '../models/userModel'
import { catchAsync, appError, setToken, getIdFromToken, filterObjectWithAllowedArray } from '../util'


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
