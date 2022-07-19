import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

import { Types } from 'mongoose'
import Product from '../models/productModel'
import {
	catchAsync,
	appError,
	filterObjectWithAllowedArray,
	filterObjectWithExcludedArray,
	apiFeatures,
	uploadImage
} from '../util'


const PUBLIC_ROOT = path.join(__dirname, '../../../..', '/public')



/* /pages/index.js  > /pages/api/products/index.js	:	handler.get(getAllProducts)
 		.	/pages/index.js  */
export const getAllProducts = catchAsync( async (req, res, next) => {
	let limit = +req.query.limit || 4

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

	// console.log({ countPage, countDocuments, limit })

	setTimeout(() => {

	res.status(200).json({
		status: 'success',
		total: countDocuments,
		length: products.length,
		countPage,
		products
	})

	}, 1000) // mimic real world data loading

})


/* productReducer.js  > /pages/api/products/index.js	:	handler.post(protect, addProduct)
 		.	/pages/user/dashboard.js  => /components/dashboard/products.js */
const filterData = [
		'name',
		'price',
		'quantity',
		'brand',
		'category',
		'size',
		'summary',
		'description',
		'images',
		'coverImage'
	]
export const addProduct = async (req, res, next) => {

	try {
		// 1. filter body
		const body = filterObjectWithAllowedArray(req.body, filterData)

		const saveToDir = path.join(PUBLIC_ROOT, '/images/products')

		// save req.body.coverPhoto
		const { image: coverImage } = await uploadImage(body.coverImage, saveToDir, [600, 200])
		req.body.coverImage = coverImage 		// set if error happend then remove

		// save req.body.images
		const promiseImages = body.images.map( async (photo) => {
			const { image } = await uploadImage(photo, saveToDir, [600, 200])
			return image
		})
		const images = await Promise.all(promiseImages)
		req.body.images = images


		const product = await Product.create({
			...body,
			coverImage,
			images,
			user: req.user._id
		})

		if(!product) return next(appError('No product found.', 404))

			// console.log(product.coverImage)

		// 5. Finally response back to client & client store data in redux store then use from store.
		res.status(200).json({
			status: 'success',
			product
		})

	} catch (err) {
		const { coverImage, images } = req.body

		// remove coverPhoto
		fs.exists(coverImage, async(isExist) => {
			if(isExist) promisify(fs.unlink)(coverImage)
		})

		// remove images
		images.forEach(image => {
			fs.exists(image, async(isExist) => {
				if(isExist) promisify(fs.unlink)(image)
			})
		})

		next(appError(err.message))
	}

}



/* (directly in /pages/product/[id].js)  > /pages/api/products/[id].js	:	handler.get(getProductBy)
 		.	we will move it  to productReducer latter  */
export const getProductBySlug = catchAsync(async (req, res, next) => {

	// const isObjectId = Types.ObjectId.isValid(req.query.id)
	// const product = isObjectId ? await Product.findById(req.query.id) : await Product.findOne({ slug: req.query.id })
	const product = await Product.findOne({ slug: req.query.slug })

	if(!product) return next(appError('No product found.', 404))

	res.status(200).json({
		status: 'success',
		product
	})
})

// export const deleteProductById = catchAsync(async (req, res, next) => {

// 	const product = await Product.findByIdAndDelete(req.query.id)
// 	if(!product) return next(appError('No product found.', 404))

// 	res.status(204).json({
// 		status: 'success',
// 	})
// })



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
