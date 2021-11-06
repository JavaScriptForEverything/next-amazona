const { connect, connection } = require('mongoose')
// used common Module system so that we can use in 	/server/models/seeder.js file

const { NODE_ENV, DB_LOCAL_URL, DB_REMOTE_URL } = process.env
const DATABASE = NODE_ENV === 'production' ? DB_REMOTE_URL : DB_LOCAL_URL

module.exports = (() => {
	if(connection.readyState >= 1) return
	connect( DATABASE	)
		.then(conn => console.log(`---- Database connected to : [${conn.connection.host}]----` ))
		.catch(err => console.error(err.message))
})()

