import '../../../server/models/database'
import nc from 'next-connect'
import { onError } from '../../../server/util'
// import { protect, getMe, updateMe } from '../../../server/controllers/authController'
import  * as authController  from '../../../server/controllers/authController'
const morgan = require('morgan')

const handler = nc({ onError })

handler
  .use(morgan('dev'))
	.use(authController.protect)
	.get(authController.getMe)
	.patch(authController.upload, authController.updateMe)

export default handler
