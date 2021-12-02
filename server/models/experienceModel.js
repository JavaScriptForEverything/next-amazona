import { Schema, models, model } from 'mongoose'

const experienceSchema = new Schema({
	title: {
		type: String,
		lowercase: true,
		trim: true,
		maxLength: 50,
		default: 'Pixel Studio',
	},
	subheader: {
		type: String,
		lowercase: true,
		trim: true,
		maxLength: 50,
		default: 'Ux/UI Designer',
	},
	date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		lowercase: true,
		trim: true,
		maxLength: 50,
		default: 'Present',
	},
	location: {
		type: String,
		lowercase: true,
		trim: true,
		maxLength: 50,
		default: 'Dhaka, Bangladesh',
	},
	avatar: {
		type: String,
		default: 'PS'
	},
	backgroundColor: {
		type: String,
		default: '#42a5f5'
	}
}, {
	timestamps: true
})

export default models.Experience || model('Experience', experienceSchema)
