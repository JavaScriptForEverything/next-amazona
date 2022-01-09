import '../../../server/models/database'
import nc from 'next-connect'
import * as paymentController from '../../../server/controllers/paymentController'
import { protect } from '../../../server/controllers/authController'
import { onError } from '../../../server/util'


const handler = nc({ onError })

	handler
		.use(protect)
		.get(paymentController.getOrders)

export default handler
