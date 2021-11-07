import '../../../server/models/database'
import nc from 'next-connect'
import { onError } from '../../../server/util'
import { getProductBySlug } from '../../../server/controllers/productController'

const handler = nc({ onError })
handler
	.get(getProductBySlug)

export default handler
