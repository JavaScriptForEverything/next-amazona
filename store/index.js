import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import productReducer from './productReducer'

const reducer = combineReducers({
	product: productReducer
})

// const makeStore = () => configureStore({ reducer })
// export const wrapper = createWrapper(makeStore)

export const wrapper = createWrapper( () => configureStore({ reducer }) )
