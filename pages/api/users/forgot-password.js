import '../../../server/models/database'
import { onError } from '../../../server/util'
import { protect, forgotPassword, resetPassword } from '../../../server/controllers/authController'
import nc from 'next-connect'

const handler = nc({ onError })

handler
	.post(forgotPassword)
	.patch(protect, resetPassword)


export default handler
