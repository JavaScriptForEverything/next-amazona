import '../../../server/models/database' 	// IIFE
import { getAllProducts, addProduct } from '../../../server/controllers/productController'
import { protect } from '../../../server/controllers/authController'
import { onError } from '../../../server/util'
import nc from 'next-connect'


const handler = nc({ onError })

handler
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
