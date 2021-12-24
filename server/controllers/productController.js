import { catchAsync, appError, filterObjectWithAllowedArray, filterObjectWithExcludedArray } from '../util'
import Product from '../models/productModel'
import cloudinary from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})




const apiFeatures = (Model, queryObj) => {
	let query = Model.find()

	// 1. Allow field range filtering
	const fields = filterObjectWithExcludedArray(queryObj, ['page', 'limit', 'sort', 'fields', 'search', 'common'])
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
	const search = function() {
		const searchObj = queryObj.search ? { name: { $regex: queryObj.search, $options: 'i' }} : {}
		this.query = this.query.find(searchObj)

		return this
	}


	return { pagination, sort, search, filter, query }
}






export const getAllProducts = catchAsync( async (req, res, next) => {
	const products = await apiFeatures(Product, req.query).pagination().sort().search().filter().query
	if(!products) return next(appError('No product found.', 404))

	res.status(200).json({
		status: 'success',
		total: products.length,
		products
	})
})
export const getProductBySlug = catchAsync( async (req, res, next) => {
	const { slug } = req.query

	const product = await Product.findOne({ slug })

	if(!product) return next(appError('No product found.', 404))

	res.status(200).json({
		status: 'success',
		product
	})
})




/* productReducer.js  > /pages/api/products/index.js	:	handler.post(protect, addProduct)
 		.	/pages/user/dashboard.js  => /components/dashboard/products.js */
export const addProduct = catchAsync( async (req, res, next) => {

	// 1. filter body
	const body = filterObjectWithAllowedArray(req.body, ['name', 'brand', 'category', 'description', 'images', 'price'])

	let images = []
	if(body.images?.length) {
		// 2. upload image to cloudinary
		const multipleImagesPromise = body.images.map(image => cloudinary.v2.uploader.upload(image, {
				folder: 'next-amazona/products'
			})
		)

		// 3. after upload, return only public_id & secure_url property
		images = await Promise.all(multipleImagesPromise)
		images = images.map(image => ({ public_id: image.public_id, secure_url: image.secure_url}))

		if(!images.length) return next(appError('Please add images [atleast one]', 404))
	}


	// 4. pass filtered body & override images with cloudinary { public_id, secure_url }
	const product = await Product.create({ ...body, images, user: req.user._id})
	if(!product) return next(appError('No product found.', 404))

	// 5. Finally response back to client & client store data in redux store then use from store.
	res.status(200).json({
		status: 'success',
		product
	})
})


export const getProductById = catchAsync(async (req, res, next) => {

	const product = await Product.findById(req.query.id)
	if(!product) return next(appError('No product found.', 404))
	// console.log(req.query)

	res.status(200).json({
		status: 'success',
		product
	})
})

export const deleteProductById = catchAsync(async (req, res, next) => {

	const product = await Product.findByIdAndDelete(req.query.id)
	if(!product) return next(appError('No product found.', 404))

	res.status(204).json({
		status: 'success',
	})
})
