import '../../../server/models/database'
import nc from 'next-connect'
import { onError } from '../../../server/util'
import { protect, getMe } from '../../../server/controllers/authController'

const handler = nc({ onError })

handler
		.get(protect, getMe)

export default handler
