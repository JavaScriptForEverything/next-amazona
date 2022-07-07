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
	action.type === HYDRATE ? {
		...state,
		...action.payload
	} : reducers(state, action)
}


const makeStore = () => configureStore({ 
	reducer: reducers,
	middleware: (getMiddlewares) => [
		...getMiddlewares(), 
		// demoMiddleware,
		demoMiddleware('dev') 
	]
 })
export const wrapper = createWrapper(makeStore, { debug: false })

