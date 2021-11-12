const { Schema, model, models } = require('mongoose')

const userSchema = new Schema({
	username: {
		type: String,
		lowercase: true,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		lowercase: true,
		trim: true,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	confirmPassword: {
		type: String,
		// required: true,
	},
	avatar: {
		type: String,
		default: '/user.jpg'
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
}, {
	timestamps: true
})

module.exports = models.User || model('User', userSchema)
