import '../../../server/models/database'
import { login } from '../../../server/controllers/userController'
import { onError } from '../../../server/util'
import nc from 'next-connect'

const handler = nc({ onError })

handler
	.post(login)


export default handler
