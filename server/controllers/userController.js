import { compare } from 'bcryptjs'
import User from '../models/userModel'
import { catchAsync, appError, setToken, getIdFromToken } from '../util'
import { isEmail } from 'validator'
import { hash } from 'bcryptjs'


// GET 	invoked in  userReducer.js >	layout/index.js
export const getUserById = catchAsync(async (req, res, next) => {
	let { id: token } = req.query 		// /api/users/[id].js => id => token
	if(!token) return next(appError('Send request with token', 400))

	const { _id, iat } = getIdFromToken(token)

	const user = await User.findById(_id)
	if(!user) return next(appError('Please login first', 403))

	res.status(200).json({
		status: 'success',
		user
	})
})


// POST  userReducer.js 	> /api/users/login.js
export const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body

	const user = await User.findOne({ email }).select('+password')
	if(!user) return next(appError('Please sign up first'))

	const authenticated = await compare(password, user.password )
	if(!authenticated) return next(appError('Email or password is incorrect'))

	const token = setToken(user._id)
	user.password = undefined

	res.status(200).json({
		status: 'success',
		user,
		token
	})
})


const filterObjByArray = (obj, arr) => {
	const newObj = {}
	arr.forEach(item => newObj[item] = obj[item])

	return newObj
}

// POST  userReducer.js 	> /api/users/signup.js
export const signup = catchAsync(async (req, res, next) => {
	// 1. filter out un wanted fields
	const allowedFields = ['username', 'email', 'password', 'confirmPassword', 'avatar']
	const body = filterObjByArray(req.body, allowedFields)

	// 2. check extra staff
	allowedFields.forEach(item => {
		if(!body[item]) throw next(appError(`${item} field is empty`))
	})

	if(!isEmail(body.email)) return next(appError('incorrect email address'))
	if(body.password !== body.confirmPassword) return next(appError('confirmPassword not matched with password field'))

	// 3. hash password before save to database
	body.password = await hash(body.password, 10)
	body.confirmPassword = undefined

	// 4. send request to database
	const user = await User.create(body)
	if(!user) return next(appError('data can\' be save into database'))

	res.status(200).json({
		status: 'success',
		// body,
		user
	})
})


