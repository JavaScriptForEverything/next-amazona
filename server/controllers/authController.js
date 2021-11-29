import { catchAsync, getIdFromToken, appError } from '../util'
import User from '../models/userModel'

export const protect = catchAsync(async(req, res, next) => {
	const authorization = req.headers.authorization
	const token = authorization?.split('Bearer ').pop()
	const { _id, iat } = getIdFromToken(token)

	const user = await User.findById(_id)
	if(!user._id) return next(appError('Please login first', 401))

	req.user = user

	next()
})
