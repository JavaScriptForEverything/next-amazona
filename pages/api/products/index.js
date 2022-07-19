import '../../../server/models/database' 	// IIFE
import { getAllProducts, addProduct } from '../../../server/controllers/productController'
import { protect } from '../../../server/controllers/authController'
import { onError } from '../../../server/util'
import nc from 'next-connect'
const morgan = require('morgan')


const handler = nc({ onError })

handler
	.use( morgan('dev') )
	.get(getAllProducts)
	.post(protect, addProduct)

export default handler

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '8mb'
		}
	}
}
