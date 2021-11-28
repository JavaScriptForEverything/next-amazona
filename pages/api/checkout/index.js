
import nc from 'next-connect'
import { createPaymentIntent } from '../../../server/controllers/paymentController'
import { onError } from '../../../server/util'

const handler = nc({ onError })

handler.post(createPaymentIntent)

export default handler
