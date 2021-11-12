import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { createWrapper } from 'next-redux-wrapper'

// import productReducer from './productReducer'
import dialogReducer from './dialogReducer'
import userReducer from './userReducer'

const reducer = combineReducers({
	// product: productReducer,
	dialog: dialogReducer,
	user: userReducer
})

// // const makeStore = () => configureStore({ reducer })
// // export const wrapper = createWrapper(makeStore)
// export const wrapper = createWrapper( () => configureStore({ reducer }) )

export default configureStore({ reducer })
