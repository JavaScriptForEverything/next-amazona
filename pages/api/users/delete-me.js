import '../../../server/models/database'
import nc from 'next-connect'
import * as userController from '../../../server/controllers/userController'
import { onError } from '../../../server/util'

const handler = nc({ onError })

handler.patch(userController.deleteMe)

export default handler


