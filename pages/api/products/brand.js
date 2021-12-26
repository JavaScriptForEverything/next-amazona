import '../../../server/models/database'
import * as productController from '../../../server/controllers/productController'
import { onError } from '../../../server/util'
import nc from 'next-connect'

const handler = nc({ onError })
handler
	.get(productController.getBrands)

export default handler
