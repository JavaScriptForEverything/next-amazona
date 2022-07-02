import nc from 'next-connect'
const morgan = require('morgan')
import { logout } from '../../../server/controllers/userController'

const handler = nc()
handler
  .use(morgan('dev'))
  .post(logout)

export default handler