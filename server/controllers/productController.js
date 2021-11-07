import { catchAsync, appError } from '../util'
import Product from '../models/productModel'


export const getAllProducts = catchAsync( async (req, res, next) => {
	const products = await Product.find()

	if(!products) return next(appError('No product found.', 404))

	res.status(200).json({
		status: 'success',
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




export const addProduct = catchAsync( async (req, res, next) => {

	return console.log(req.body)

	const product = await Product.create(req.body)

	if(!product) return next(appError('No product found.', 404))

	res.status(200).json({
		status: 'success',
		product
	})
})

