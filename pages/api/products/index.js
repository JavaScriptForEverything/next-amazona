import '../../../server/models/database' 	// IIFE
import { getAllProducts, addProduct } from '../../../server/controllers/productController'
import { onError } from '../../../server/util'
import nc from 'next-connect'


const handler = nc({ onError })

handler
	.get(getAllProducts)
	.post(addProduct)

export default handler
