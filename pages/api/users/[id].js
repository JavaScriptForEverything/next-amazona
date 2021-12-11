import nc from 'next-connect'
import * as userController from '../../../server/controllers/userController'
import { onError } from '../../../server/util'

const handler = nc({ onError })

handler.get(userController.getUserById)

export default handler
