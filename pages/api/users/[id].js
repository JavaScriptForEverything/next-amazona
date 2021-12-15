import nc from 'next-connect'
import { protect } from '../../../server/controllers/authController'
import * as userController from '../../../server/controllers/userController'
import { onError } from '../../../server/util'

const handler = nc({ onError })

handler
	.use(protect)
	.get(userController.getUserById)

export default handler
