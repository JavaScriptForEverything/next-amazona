import '../../../server/models/database'
import { protect } from '../../../server/controllers/authController'
import { userMailTo } from '../../../server/controllers/userController'
import { onError } from '../../../server/util'
import nc from 'next-connect'

const handler = nc({ onError })

handler
	.use(protect)
	.post(userMailTo)


export default handler
