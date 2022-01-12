import { Types } from 'mongoose'
import cloudinary from 'cloudinary'
import Product from '../models/productModel'
import {
	catchAsync,
	appError,
	filterObjectWithAllowedArray,
	filterObjectWithExcludedArray,
	apiFeatures
} from '../util'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})








/* /pages/index.js  > /pages/api/products/index.js	:	handler.get(getAllProducts)
 		.	/pages/index.js  */
export const getAllProducts = catchAsync( async (req, res, next) => {
	let limit = req.query.limit
			limit = limit * 1

	const products = await apiFeatures(Product, req.query)
		.pagination()
		.sort()
		.search()
		.filter()
		.handleBrandFilter()
		.query

	if(!products) return next(appError('No product found.', 404))

	const countDocuments = await Product.countDocuments()
	const countPage = Math.ceil(countDocuments / limit)
	// console.log({ brand: req.query.brand })

	res.status(200).json({
		status: 'success',
		total: products.length,
		products,
		countPage
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
