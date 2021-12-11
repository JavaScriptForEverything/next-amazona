import nc from 'next-connect'
import * as userController from '../../../server/controllers/userController'
import { onError } from '../../../server/util'

const handler = nc({ onError })

handler
	.get(userController.getAllUser) 	// this route must be protected & restricted to user 'admin' only

export default handler
