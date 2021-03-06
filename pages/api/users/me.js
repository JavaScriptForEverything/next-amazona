import '../../../server/models/database'
import nc from 'next-connect'
import { onError } from '../../../server/util'
import { protect, getMe, updateMe } from '../../../server/controllers/authController'

const handler = nc({ onError })

handler
		.use(protect)
		.get(getMe)
		.patch(updateMe)

export default handler
