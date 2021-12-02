import { Schema, models, model } from 'mongoose'

const profileSchema = new Schema({
	phone: {
		type: Number,
		min: 10000000, 			// for
		maxLength: 99999999999,
		default: '01957500605'
	},
	age : {
		type: String,
		lowercase: true,
		maxLength: 50,
		trim: true,
		default: '28 Yars'
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
	experience : {
		type: String,
		lowercase: true,
		maxLength: 50,
		trim: true,
		default: '6 Yars'
	},
	resume : {
		type: String,
		default: '/resume.pdf'
	}
}, {
	timestamps: true
})

export default models.Profile || model('Profile', profileSchema)
