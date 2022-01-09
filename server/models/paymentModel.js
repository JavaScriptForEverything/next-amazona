import { Schema, model, models } from 'mongoose'
import { isEmail } from 'validator'

/* 	Create every models as though we can apply every API features to all model */

/* to add filtering features we need to add
 		. a product[s] name [as array]
 		. price field seperately only for filtering purpose
 		. use createdAt property as filter by date
 		. use isDeleveliried property as filter by status
*/


const paymentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	clientSecret: {
		type: String,
		required: true
	},
	shipping: {
		username: {
			type: String,
			trim: true,
			lowercase: true,
			minLength: 3,
			maxLength: 30,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			minLength: 3,
			maxLength: 30,
			validate: (val) => isEmail(val),
			required: true,
		},
		country: {
			name: {
				type: String,
				trim: true,
				lowercase: true,
				minLength: 3,
				maxLength: 30,
				required: true,
			},
			emoji: String,
		},
		phone: {
			type: Number,
			minLength: 10,
			maxLength: 15,
		},
		address: {
			type: String,
			trim: true,
			lowercase: true,
			minLength: 10,
			maxLength: 100,
			required: true,
		},
		code: {
			type: Number,
			max: 99999,
			required: true
		}
	},
	payment: {
		amount: {
			type: Number,
			// max: 99999,
			required: true
		},
		currency: {
			type: String,
			trim: true,
			lowercase: true,
			minLength: 3,
			required: true,
		},
	},
	isPaid: {
		type: Boolean,
		default: false
	},
	paidAt: {
		type: Date,
	},
	isDelivered: {
		type: Boolean,
		default: false
	},
	deliveredAt: {
		type: Date,
	}
}, {
	timestamps: true
})

export default models.Payment || model('Payment', paymentSchema)
