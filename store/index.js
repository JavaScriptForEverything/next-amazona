import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { createWrapper } from 'next-redux-wrapper'

// import productReducer from './productReducer'
import dialogReducer from './dialogReducer'
import userReducer from './userReducer'
import paymentReducer from './paymentReducer'

const reducer = combineReducers({
	// product: productReducer,
	dialog: dialogReducer,
	user: userReducer,
	payment: paymentReducer
})

// // const makeStore = () => configureStore({ reducer })
// // export const wrapper = createWrapper(makeStore)
// export const wrapper = createWrapper( () => configureStore({ reducer }) )

export default configureStore({ reducer })
