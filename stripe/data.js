const itemCreator = (label='', name='', type='text') => ({label, name, type})
// => { label: 'Email address', name: 'email', type='text'}


// 1. Collect Contact Info
export const shippingItems = [
	itemCreator('Full Name', 'username'),
	itemCreator('Email Address', 'email', 'email'),
	itemCreator('Country Name', 'country'),
	itemCreator('Phone Number', 'phone', 'number'),
	itemCreator('Street Address', 'address'),
	itemCreator('Postal Code', 'code', 'number'),
]
export const shippingObj = {} 		// We only need this to verify it's form fields
shippingItems.forEach(obj => shippingObj[obj.name] = '')



// 2. See Product Details to pay 	// No need Because, we just see the detail


// 3. Set Payment Method
export const paymentItems = [
	itemCreator('Currency', 'currency'),
	itemCreator('Amount', 'amount', 'number'),
	itemCreator('Credit Card Number', 'card'),
	itemCreator('Expiration Date', 'expires'),
	itemCreator('CVC', 'cvc'),
]
export const paymentObj = {} 				// No need Because error will be checked by stripe
paymentItems.forEach(obj => paymentObj[obj.name] = '')



