const { Schema, model, models } = require('mongoose')
const { hash } = require('bcryptjs')

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
		required: true,
		validate: function() { return this.password === this.confirmPassword }
	},
	avatar: {
		type: String,
		default: '/user.jpg'
	},
	isAdmin: {
		type: Boolean,
		default: false
	},

	passwordResetToken: String, 		// required to reset password
	passwordResetExpires: Date, 		// required to make token expire after given time
	passwordChangedAt: Date, 				// required to make token invalid after modify password
}, {
	timestamps: true
})

userSchema.pre('save', async function(next) {
	if(!this.isModified('password')) return 					// not hash on every update, only hash if password field update

	this.password = await hash(this.password, 12)
	this.confirmPassword = undefined
	next()
})

module.exports = models.User || model('User', userSchema)
