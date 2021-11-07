import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'

import { catchAsyncDispatch } from '../util'


const { reducer, actions } = createSlice({
	name: 'product',
	initialState: {
		products: [],
		product: {}
	},
	reducers: {
		requested: (state, action) => ({ ...state, loading: true }),
		failed: (state, action) => ({
			...state,
			loading: false,
			error: action.payload
		}),
		productGot: (state, action) => ({
			...state, loading: false,
			...action.payload
		}),
		productBySlug: (state, action) => ({
			...state, loading: false,
			...action.payload
		}),
	},

	extraReducers: {
		[HYDRATE]: (state, action) => ({ ...state, ...action.payload }),
	}
})
export default reducer




export const getProducts = (req) => catchAsyncDispatch( async (dispatch) => {
	dispatch(actions.requested())

	const { origin } = absoluteUrl(req)
	const { data } = await axios.get(`${origin}/api/products`)
	// const { data } = await axios.get('https://api.github.com/users/robitops10')

	dispatch(actions.productGot( data ))
}, actions.failed)


export const getProductBySlug = (req, slug) => catchAsyncDispatch( async (dispatch) => {
	// dispatch(actions.requested())

	const { origin } = absoluteUrl(req)
	const { data } = await axios.get(`${origin}/api/products/${slug}`)

	console.log(data)

	dispatch(actions.productBySlug( data ))
}, actions.failed)

