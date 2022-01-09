import { Stripe } from 'stripe'
import { catchAsync, appError, apiFeatures } from '../util'
import Payment from '../models/paymentModel'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const createPaymentIntent = catchAsync(async (req, res, next) => {
	const { payment: { amount, currency }} = req.body

	if(!amount) return next(appError('You must send amount'))
	if(!currency) return next(appError('You must send currency'))

	/* 	create paymentIntents if already create and which has an session token client_id
			else every missed transaction create incomplete list in stripe payment tab

			if(paymentIntentId) {
				stripe.paymentIntents.retrieve(paymentId)...
			} else {
				stripe.paymentIntents.create({...})
			}
	*/

	// Stripe payment
	const { client_secret } = await stripe.paymentIntents.create({
		amount: amount * 100,
		currency: currency.toLowerCase()
	})

	// save success payment into database
	const payment = await Payment.create({
		user: req.user._id,
		...req.body,
		clientSecret: client_secret
	})

	res.status(201).json({
		status: 'success',
		clientSecret: client_secret,
		payment
	})
})



/* paymentReducer.js  > /pages/api/payments/index.js	:	handler.get(protect, getOrders)
 		.	/pages/users/dashboard.js 	=> /components/dashboard/orders.js */
export const getOrders = catchAsync(async (req, res, next) => {

	const orders = await apiFeatures(Payment, req.query)
		.pagination()
		.sort()
		.search()
		.filter()
		.handleBrandFilter()
		.query

	let countPage = await Payment.countDocuments()
			countPage = countPage / req.query.limit
			countPage = countPage && Math.ceil(countPage)

	if(!orders) return next(appError('No orders found.', 404))

	res.status(200).json({
		status: 'success',
		total: orders.length,
		orders,
		countPage
	})
})
