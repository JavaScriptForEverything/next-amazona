
import nc from 'next-connect'
import { createPaymentIntent } from '../../../server/controllers/paymentController'
import { protect } from '../../../server/controllers/authController'
import { onError } from '../../../server/util'

const handler = nc({ onError })

handler
	.post(protect, createPaymentIntent)

export default handler
