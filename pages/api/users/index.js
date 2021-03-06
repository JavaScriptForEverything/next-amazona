import nc from 'next-connect'
import * as userController from '../../../server/controllers/userController'
import { protect } from '../../../server/controllers/authController'
import { onError } from '../../../server/util'

const handler = nc({ onError })

handler
	.use(protect)
	.get(userController.getAllUsers) 	// this route must be protected & restricted to user 'admin' only
	.post(userController.uploadImage) // just for testing

export default handler
