import { Stripe } from 'stripe'
import { catchAsync, appError } from '../util'
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
