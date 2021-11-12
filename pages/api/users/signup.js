import '../../../server/models/database'
import { signup } from '../../../server/controllers/userController'
import { onError } from '../../../server/util'
import nc from 'next-connect'

const handler = nc({ onError })

handler
	.post(signup)


export default handler
