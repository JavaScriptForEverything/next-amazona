const { Schema, model, models } = require('mongoose')
// used common Module system so that we can use in 	/server/models/seeder.js file

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minLength: 5,
		lowercase: true,
	},
	slug: {
		type: String,
	},
	category: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		enum: ['shirt', 'pant']
	},
	brand: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		enum: ['niki', 'adidas', 'ramond', 'oliver', 'zara', 'casely']
	},
	price: {
		type: Number,
		required: true,
		min: 5,
	},
	inStock: {
		type: Number,
		required: true,
		min: 0,
	},
	numReviews: {
		type: Number,
	},
	description: {
		type: String,
		required: true,
		minLength: 10,
		maxLength: 5000,
		trim: true
	},
	image: {
		type: String,
		required: true,
	},

}, {
	timestamps: true
})

module.exports = models.Product || model('Product', productSchema)


productSchema.pre(/^find/, function(){
	console.log('Hello Hook')
})
