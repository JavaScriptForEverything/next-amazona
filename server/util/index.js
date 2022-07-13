import { sign, verify } from 'jsonwebtoken' 	// required for setToken()
import nodemailer from 'nodemailer'
import { nanoid } from 'nanoid'
import sharp from 'sharp'

export const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next)


// handle Error manually
export const appError = (message='', statusCode=400, status='') => {
	// new Error inherit captureStackTrace else we can add by Error.captureStackTrace()
	const error = new Error(message)

	error.status = status ? status : `${statusCode}`.startsWith(4) ? 'failed' : 'error',
	error.statusCode = statusCode

	return error
}


// Global Error handler for API
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


// 		const token = setToken(user._id)
export const setToken = (_id) => sign( {_id}, process.env.TOKEN_SALT, { expiresIn: process.env.TOKEN_EXPIRES })

// 
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
const mailtrapCredential = {
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
// const transportOptions = process.env.NODE_ENV === 'production' ? sendGridCrediential : mailtrapCredential
const transportOptions = mailtrapCredential 	// SendGrid account disabled after some time
export const sendMail = async ({ from='<next.amazona.gmail.com>', to, subject, text }) => {
	const transport = nodemailer.createTransport(transportOptions)

	await transport.sendMail({ from, to, subject, text })
}



// add this features on every Models on getAll controller method
export const apiFeatures = (Model, queryObj) => {
	let query = Model.find()

	// 1. Allow field range filtering
	const fields = filterObjectWithExcludedArray(queryObj, ['page', 'limit', 'sort', 'fields', 'search', 'brand', 'common'])
	const tempObj = {}

	Object.entries(fields).forEach(([key, value]) => {
		const arr = value.split(',')

		if(arr.length === 2) {
			tempObj[key] = { $gte: value.split(',')[0], $lte: value.split(',')[1] }

		} else {
			tempObj[key] = value
		}
	})
	query = query.find(tempObj)


	// 2. pagination
	const pagination = function() {
		const page = +queryObj.page || 1
		const limit = +queryObj.limit || 4
		const skip = (page - 1) * limit

		this.query = this.query.skip(skip).limit(limit)
		return this
	}

	// 3. sorting
	const sort = function() {
		this.query = this.query.sort(queryObj.sort?.split(',').join(' '))
		return this
	}

	// 4. filter by fields
	const filter = function() {
		this.query = this.query.select(queryObj.fields?.split(',').join(' '))
		return this
	}

	// 5. search
	// const search = function() {
	// 	const searchObj = queryObj.search ? { name: { $regex: queryObj.search, $options: 'i' }} : {}
	// 	this.query = this.query.find(searchObj)

	// 	return this
	// }
	const search = function() {
		const fieldName 	= queryObj.search?.split(',')[0]
		const searchValue = queryObj.search?.split(',')[1]

		const searchObj = queryObj.search ? { [fieldName]: { $regex: searchValue, $options: 'i' }} : {}
		this.query = this.query.find(searchObj)

		return this
	}

	const handleBrandFilter = function() {
		const brand = queryObj.brand?.split(',') || []

		if (brand.length) this.query = this.query.find({ brand : { $in: [...brand]} } )

		// // Query.prototype.aggregate() is not mongoose method, but find is. but we can use Model.aggregate([])
		// if(brand.length) this.query = this.query.aggregate([
		// 	{$match: { brand : { $in: [...brand]} } }
		// ])

		return this
	}

	return { query, pagination, sort, search, filter, handleBrandFilter }
}




/* const PUBLIC_ROOT = path.join(__dirname, '../../../../public')  
    const { error, image } = await uploadImage(req.body.avatar, PUBLIC_ROOT)
		const { error, image } = await uploadImage(dataURL, saveToDir, [100, 100] )  // => size=[50, 50]
    if(error) return next(appError(error))

    res.status(200).json({ 
      status: 'success', 
      user: { avatar: image } 
    }) */
export const uploadImage = async (image={}, saveToDir, size=[50, 50]) => {
  let error = ''

  // 1. Get image as dataURL
  const dataURL = await image.secure_url                 
  if(!dataURL) return error = 'No image found'

  const isValidDataURL = dataURL.startsWith('data:')
  if( !isValidDataURL ) return error = `upload image instead of '${dataURL}'`

  // 2. remove metadata so that only base64 encoded data remains
  const base64 = dataURL.split(';base64,').pop()    

  // 3. convert base64 data to Binary buffer
  const buf = Buffer.from(base64, 'base64')         

  // 4. Save image from buffer  
  const uniqueName = nanoid()
  const public_id = uniqueName
	const filename = public_id + '.jpg'
	const destination = `${saveToDir}/${filename}`
	const secure_url = destination.split('/public').pop()

  await sharp(buf)
    .resize(size)
    .toFormat('jpg')
    .toFile(destination)
  
  // 5. Return image or error just node style:  (err, (success) => )
  return {
    // error, 			// why error return something, need to check
    image: { secure_url, public_id, size: image.size }
  }
}