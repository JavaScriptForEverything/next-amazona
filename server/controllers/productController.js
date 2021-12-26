import { Types } from 'mongoose'
import cloudinary from 'cloudinary'
import Product from '../models/productModel'
import { catchAsync, appError, filterObjectWithAllowedArray, filterObjectWithExcludedArray } from '../util'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})




const apiFeatures = (Model, queryObj) => {
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
	const search = function() {
		const searchObj = queryObj.search ? { name: { $regex: queryObj.search, $options: 'i' }} : {}
		this.query = this.query.find(searchObj)

		return this
	}

	const handleBrandFilter = function() {
		const brand = queryObj.brand?.split(',') || []

		if (brand.length) this.query = this.query.find({ brand : { $in: [...brand]} } )

		// // Query.prototype.aggregate() is not mongoose method, but find is
		// if(brand.length) this.query = this.query.aggregate([
		// 	{$match: { brand : { $in: [...brand]} } }
		// ])

		return this
	}

	return { query, pagination, sort, search, filter, handleBrandFilter }
}






/* /pages/index.js  > /pages/api/products/index.js	:	handler.get(getAllProducts)
 		.	/pages/index.js  */
export const getAllProducts = catchAsync( async (req, res, next) => {
	const products = await apiFeatures(Product, req.query)
		.pagination()
		.sort()
		.search()
		.filter()
		.handleBrandFilter()
		.query

	if(!products) return next(appError('No product found.', 404))

	// console.log({ brand: req.query.brand })

	res.status(200).json({
		status: 'success',
		total: products.length,
		products
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



/* (directly in /pages/product/[id].js)  > /pages/api/products/[id].js	:	handler.get(getProductBy)
 		.	we will move it  to productReducer latter  */
export const getProductBy = catchAsync(async (req, res, next) => {

	const isObjectId = Types.ObjectId.isValid(req.query.id)
	const product = isObjectId ? await Product.findById(req.query.id) : await Product.findOne({ slug: req.query.id })

	if(!product) return next(appError('No product found.', 404))

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



/* productReducer.js  > /pages/api/products/brand.js	:	handler.get(getBrands)
 		.	/pages/index.js  */
export const getBrands = catchAsync( async (req, res, next) => {

	const brands = await Product.aggregate([
		{ $group: { _id: '$brand', count: { $sum: 1 } } }
	])

	res.status(202).json({
		status: 'success',
		brands,
	})
})
