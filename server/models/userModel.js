const { Schema, model, models } = require('mongoose')
const { isEmail } = require('validator')
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
		validate: (email) => isEmail(email)
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
	isAdmin: {
		type: Boolean,
		default: false
	},

	passwordResetToken: String, 		// required to reset password
	passwordResetExpires: Date, 		// required to make token expire after given time
	passwordChangedAt: Date, 				// required to make token invalid after modify password

	avatar: {
		type: String,
		default: '/user.jpg'
	},
	title: {
		type: String,
		lowercase: true,
		default: 'full stack developer'
	},
	description: {
		type: String,
		// required: true,
		lowercase: true,
		minLength: 100, 			// for
		maxLength: 500,
		trim: true,
		default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et inventore soluta quae tempore reprehenderit accusantium aliquam nisi facere similique omnis cum architecto perspiciatis aperiam eaque nulla possimus perferendis officia, quibusdam?',
	},
	skills: {
		type: [String],
		lowercase: true,
		maxLength: 50,
		trim: true,
		default: ['ReactJS', 'Redux', 'Material-UI', 'NodeJS', 'MongoDB', 'ExpressJS'],
	},

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
