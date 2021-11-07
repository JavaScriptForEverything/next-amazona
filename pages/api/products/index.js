import '../../../server/models/database' 	// IIFE
import nc from 'next-connect'
import { onError } from '../../../server/util'
import { getAllProducts, addProduct } from '../../../server/controllers/productController'


const handler = nc({ onError })

handler
	.get(getAllProducts)
	.post(addProduct)

export default handler
