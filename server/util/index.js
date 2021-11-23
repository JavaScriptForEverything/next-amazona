import { sign, verify } from 'jsonwebtoken' 	// required for setToken()

export const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next)


export const appError = (message='', statusCode=400, status='') => {
	// new Error inherit captureStackTrace else we can add by Error.captureStackTrace()
	const error = new Error(message)

	error.status = status ? status : `${statusCode}`.startsWith(4) ? 'failed' : 'error',
	error.statusCode = statusCode

	return error
}
export const onError = (err, req, res, next) => { 		// like express global Error handler
	res.status(err.statusCode || 500).json({
		status: err.status,
		message: err.message,
		error: {
			...err,
			stack: err.stack 		// it is inherit property so to see, have to call specially
		}
	})
}


export const setToken = (_id) => sign( {_id}, process.env.TOKEN_SALT, { expiresIn: process.env.TOKEN_EXPIRES })
export const getIdFromToken = (token) => verify(token, process.env.TOKEN_SALT)