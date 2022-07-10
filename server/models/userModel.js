const { Schema, model, models } = require('mongoose')
const { isEmail } = require('validator')
const { hash } = require('bcryptjs')
const { randomHexColor } = require('../util')


const userSchema = new Schema({
	name: {
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
	role: {
		type: String,
		enum: ['user', 'admin', 'guest'],
		default: 'user'
	},
	active: { 											// deside user active or inactive or deleted
		type: Boolean,
		default: true
	},

	passwordResetToken: String, 		// required to reset password
	passwordResetExpires: Date, 		// required to make token expire after given time
	passwordChangedAt: Date, 				// required to make token invalid after modify password

	// transactions: 								: populate this from payment createdAt

	// avatar: { 											// we make it required in signup controler, by condition check.
	// 	type: String,
	// 	default: '/user.jpg'
	// },
	avatar: {
		public_id: {
			type: String,
			required: true,
			unique: true
		}, 
		secure_url: {
			type: String,
			required: true,
		}, 
		size: Number
		
	},
	title: {
		type: String,
		lowercase: true,
		default: 'full stack developer'
	},
	description: {
		type: String,
		lowercase: true,
		minLength: 100, 			// for
		maxLength: 500,
		trim: true,
		default: 'user description... Lorem ipsum dolor sit amet consectetur adipisicing elit. Et inventore soluta quae tempore',
	},
	skills: {
		type: [String],
		lowercase: true,
		maxLength: 50,
		trim: true,
		default: ['ReactJS', 'Redux', 'Material-UI', 'NodeJS', 'MongoDB', 'ExpressJS'],
	},

	// Basic Info
	phone: {
		type: String,
		minLength: 10,
		maxLength: 12,
		default: '01957500605'
	},
	age : {
		type: Number,
		min: 5,
		max: 100,
		default: 20
	},
	ctc: {
		type: Number,
		default: 2.5
	},
	location: {
		address: {
			type: String,
			lowercase: true,
			maxLength: 100,
			trim: true,
			default: '315 hazipara mosjid road'
		},
		city: {
			type: String,
			lowercase: true,
			maxLength: 100,
			trim: true,
			default: 'dhaka'
		},
		country: {
			type: String,
			lowercase: true,
			maxLength: 100,
			trim: true,
			default: 'bangladesh'
		},
	},
	experience : { 			// yearOfExperience
		type: Number,
		max: 50,
		default: 6
	},
	resume : {
		type: String,
	},

	// Experience Info
	experiences: [{
		title: {
			type: String,
			lowercase: true,
			trim: true,
			maxLength: 50,
			default: 'Pixel Studio',
		},
		companyName: {
			type: String,
			lowercase: true,
			trim: true,
			maxLength: 50,
			default: 'Ux/UI Designer',
		},
		joiningDate: {
			type: Date,
			default: Date.now
		},
		currentStatus: {
			type: String,
			lowercase: true,
			trim: true,
			maxLength: 50,
			default: 'Present',
		},
		lobLocation: {
			type: String,
			lowercase: true,
			trim: true,
			maxLength: 50,
			default: 'Dhaka, Bangladesh',
		},
		logoBackgroundColor: {
			type: String,
			default: randomHexColor  				// default: '#42a5f5'
		}
	}]

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
