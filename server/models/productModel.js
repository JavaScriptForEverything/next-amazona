const { Schema, model, models } = require('mongoose')
const slug = require('slugify')
// used common Module system so that we can use in 	/server/models/seeder.js file

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minLength: 5,
		lowercase: true,
	},
	slug: String, 							// must be present to save from .pre('save')
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
		// required: true,
		min: 0,
	},
	quantity: {
		type: Number,
		// required: true,
		min: 1,
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
	images: [{
		public_id: {
			type: String,
			required: true
		},
		secure_url: {
			type: String,
			required: true
		}
	}],

}, {
	timestamps: true
})

productSchema.pre('save', function(next) {
	this.slug = slug(this.name, { lower: true })
	next()
})

module.exports = models.Product || model('Product', productSchema)

