const { Schema, model, models } = require('mongoose')
const slug = require('slugify')
// used common Module system so that we can use in 	/server/models/seeder.js file

const productSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	name: {
		type: String,
		required: true,
		trim: true,
		// minLength: 5,
		lowercase: true,
		unique: true
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
		// set: val => val.toFixed(2)
		// type: String,
		// set: val => val.toLocaleString('en-US', {
		// 	style: 'currency',
		// 	currency: 'usd',
		// 	currencyDisplay: 'symbol',
		// 	minimumFractionDigits: 2
		// })
	},
	description: {
		type: String,
		required: true,
		minLength: 10,
		maxLength: 5000,
		trim: true
	},
	// images: [{
	// 	public_id: {
	// 		type: String,
	// 		required: true
	// 	},
	// 	secure_url: {
	// 		type: String,
	// 		required: true
	// 	}
	// }],
	coverImage: {
		public_id: String,
		secure_url: {
			type: String,
			default: '/images/coverImage.jpg'
		}
	},
	images: [{
		public_id: String,
		secure_url: String,
	}],

	inStock: {
		type: Number,
		min: 0,
	},
	quantity: {
		type: Number,
		min: 1,
	},
	numReviews: [{
		type: String,
	}],
	ratings: {
		type: Number,
		default: 4
	},

}, {
	timestamps: true
})


productSchema.pre('save', function(next) {
	this.price = +this.price
	this.quantity = +this.quantity
	this.slug = slug(this.name, { lower: true })
	next()
})


// without await, if try to use await it will crush my application
productSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
		select: 'username email role',
	})
	next()
})




module.exports = models.Product || model('Product', productSchema)

