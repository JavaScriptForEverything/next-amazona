import '../../../server/models/database'
import { login } from '../../../server/controllers/userController'
import { onError } from '../../../server/util'
import nc from 'next-connect'
const morgan = require('morgan')

const handler = nc({ onError })

handler
  .use(morgan('dev'))
	.post(login)


export default handler
