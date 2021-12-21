import '../../../server/models/database'
import { getProductBySlug } from '../../../server/controllers/productController'
import { onError } from '../../../server/util'
import nc from 'next-connect'

const handler = nc({ onError })
handler
	.get(getProductBySlug)

export default handler
