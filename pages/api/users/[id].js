import '../../../server/models/database'
import nc from 'next-connect'
import { onError } from '../../../server/util'
import { getUserById } from '../../../server/controllers/userController'

const handler = nc({ onError })

	handler
		.get(getUserById) 								// /api/users/:id

export default handler
