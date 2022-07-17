import '../../../server/models/database'
import { protect } from '../../../server/controllers/authController'
import * as userController from '../../../server/controllers/userController'
import { onError } from '../../../server/util'
import nc from 'next-connect'
const morgan = require('morgan')

const handler = nc({ onError })

handler
	.use(morgan('dev'))
	// .use(protect) 										// no need because we sending id
	.get(userController.getUserById)
	// .post(userController.getMeInServer)
	.patch(userController.updateUserById)

export default handler
