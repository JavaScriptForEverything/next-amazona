import '../../../server/models/database'
import { protect } from '../../../server/controllers/authController'
import * as productController from '../../../server/controllers/productController'
import { onError } from '../../../server/util'
import nc from 'next-connect'

const handler = nc({ onError })
handler
	.get(productController.getProductBy)
	.delete(protect, productController.deleteProductById)

export default handler
