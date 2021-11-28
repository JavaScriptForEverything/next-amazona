import { Stripe } from 'stripe'
import { catchAsync, appError } from '../util'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createPaymentIntent = catchAsync(async (req, res, next) => {
	const { amount, currency } = req.body

	if(!amount) return next(appError('You must send amount'))
	if(!currency) return next(appError('You must send currency'))


	const { client_secret } = await stripe.paymentIntents.create({
		amount: amount * 100,
		currency: currency.toLowerCase()
	})

	res.status(200).json({
		status: 'success',
		clientSecret: client_secret
	})
})
