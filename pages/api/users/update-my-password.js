import '../../../server/models/database'
import nc from 'next-connect'
import { onError } from '../../../server/util'
import { protect, updateMyPassword } from '../../../server/controllers/authController'

const handler = nc({ onError })

handler
		.use(protect)
		.patch(updateMyPassword)

export default handler
