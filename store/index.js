import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

import dialogReducer from './dialogReducer'
import paymentReducer from './paymentReducer'
import userReducer from './userReducer'
import productReducer from './productReducer'
import reviewReducer from './reviewReducer'

import productMiddleware from './middleware/products'

const reducers = combineReducers({
	dialog: dialogReducer,
	payment: paymentReducer,
	user: userReducer,
	product: productReducer,
	review: reviewReducer

})

const masterReducer = (state, action) => {
	return action.type === HYDRATE ? {
		...state,
		dialog: {
			...state.dialog,
			dialog: { ...state.dialog.dialog, ...action.payload.dialog.dialog },
		},
		payment: {
			...state.payment,
			payment: { ...state.payment.payment, ...action.payload.payment.payment },
		},
		user: {
			...state.user,
			user: { ...state.user.user, ...action.payload.user.user },
		},
		product: {
			...state.product,
			product: { ...state.product.product, ...action.payload.product.product },
		},
	} : reducers(state, action)
}


const makeStore = () => configureStore({ 
	reducer: masterReducer,
	middleware: (getMiddlewares) => [
		...getMiddlewares(), 
		productMiddleware,
	]
 })
export const wrapper = createWrapper(makeStore, { debug: false })

