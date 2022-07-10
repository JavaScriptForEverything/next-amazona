import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

import productReducer from './productReducer'
import dialogReducer from './dialogReducer'
import userReducer from './userReducer'
import paymentReducer from './paymentReducer'

import demoMiddleware from './middleware/demo'

const reducers = combineReducers({
	product: productReducer,
	dialog: dialogReducer,
	user: userReducer,
	payment: paymentReducer
})

const masterReducer = (state, action) => {
	return action.type === HYDRATE ? {
		...state,
		user: {
			...state.user,
			user: { ...state.user.user, ...action.payload.user.user },
		},
		product: {
			...state.product,
			product: { ...state.product.product, ...action.payload.product.product },
		},
		payment: {
			...state.payment,
			payment: { ...state.payment.payment, ...action.payload.payment.payment },
		},
		dialog: {
			...state.dialog,
			dialog: { ...state.dialog.dialog, ...action.payload.dialog.dialog },
		},
	} : reducers(state, action)
}


const makeStore = () => configureStore({ 
	reducer: masterReducer,
	middleware: (getMiddlewares) => [
		...getMiddlewares(), 
		// demoMiddleware,
		demoMiddleware('dev') 
	]
 })
export const wrapper = createWrapper(makeStore, { debug: false })

