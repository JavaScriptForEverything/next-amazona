import '../../../server/models/database'
import { protect } from '../../../server/controllers/authController'
import * as productController from '../../../server/controllers/productController'
import { onError } from '../../../server/util'
import nc from 'next-connect'
const morgan = require('morgan')

const handler = nc({ onError })
handler
	.use(morgan('dev'))
	.get(productController.getProductBySlug)
	// .delete(protect, productController.deleteProductById)

export default handler
