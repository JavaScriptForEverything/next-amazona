import { sign, verify } from 'jsonwebtoken' 	// required for setToken()
import nodemailer from 'nodemailer'

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

export const filterObjectWithExcludedArray = (obj, filteredField) => {
	const tempObj = JSON.parse(JSON.stringify(obj))
	Object.keys(obj).forEach(item => filteredField.includes(item) && delete tempObj[item] )

	return tempObj
}

export const filterObjectWithAllowedArray = (obj, allowedItems) => {
	const newObj = {}
	allowedItems.forEach(item => newObj[item] = obj[item])

	return newObj
}

// Replace every Zero with random number + always return 6 digit long hex code
export const randomHexColor = "#000000".replace(/0/g,() => (~~(Math.random()*16)).toString(16) )

// ---------------[ SendMail ]-----------
const stripeCrediential = {
	  host: process.env.MAILTRAP_HOST,
	  port: process.env.MAILTRAP_PORT,
	  auth: {
	    user: process.env.MAILTRAP_USER,
	    pass: process.env.MAILTRAP_PASS,
	  }
	}
const sendGridCrediential = {
	  service: 'SendGrid',
	  auth: {
	    user: process.env.SENDGRID_USER,
	    pass: process.env.SENDGRID_PASS,
	  }
	}
// const transportOptions = process.env.NODE_ENV === 'production' ? sendGridCrediential : stripeCrediential
const transportOptions = stripeCrediential 	// SendGrid account disabled after some time
export const sendMail = async ({ from='<next.amazona.gmail.com>', to, subject, text }) => {
	const transport = nodemailer.createTransport(transportOptions)

	await transport.sendMail({ from, to, subject, text })
}


