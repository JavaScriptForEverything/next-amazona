import { createSlice } from '@reduxjs/toolkit'
// import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'
// import absoluteUrl from 'next-absolute-url'

import { catchAsyncDispatch } from '../util'


const { reducer, actions } = createSlice({
	name: 'product',
	initialState: {
		products: [],
		product: {},

		loading: false,
		error: '',

		cartItems: (typeof window !== 'undefined') && JSON.parse(localStorage.getItem('cartItems')) || [],
		shippingCharge: 0,
		totalPrice: 0,
	},
	reducers: {
		requested: (state, action) => ({ ...state, loading: true, error: '' }),
		failed: (state, action) => ({...state, loading: false, error: action.payload, }),
		cartItemAdded: (state, action) => {
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems.concat(action.payload)) )

			return { ...state, loading: false, cartItems: state.cartItems.concat(action.payload) }
		},
		cartItemsFiltered: (state, action) => {
			localStorage.setItem('cartItems', JSON .stringify(state.cartItems .filter( item => item._id !== action.payload._id)) )

			return { ...state, loading: false, cartItems: state.cartItems.filter(item => item._id !== action.payload._id) }
		},
		cartItemUpdated: (state, action) => {
			const { _id, quantity } = action.payload
			const cartItems = state.cartItems.map(item => item._id === _id ? {...item, quantity } : item )

			localStorage.setItem('cartItems', JSON.stringify(cartItems) )

			return { ...state, loading: false, cartItems }
		},
		cartItemsRemoved: (state, action) => {
			localStorage.removeItem('cartItems')
			return {
				...state,
				cartItems: []

			}
		},

		totalPrice: (state, action) => ({
			...state,
			totalPrice: state.cartItems?.reduce((total, item) => total + item.price*item.quantity, state.shippingCharge)
		}),


		productAdded: (state, action) => ({
			...state,
			loading: false,
			product: action.payload
		})

	},

	// extraReducers: {
	// 	[HYDRATE]: (state, action) => ({ ...state, ...action.payload }),
	// }
})
export default reducer


export const addItemToCart = (cart) => (dispatch) => {
	dispatch(actions.requested())
	dispatch(actions.cartItemAdded(cart))
}
export const filterCartItems = (cart) => (dispatch) => {
	dispatch(actions.requested())
	dispatch(actions.cartItemsFiltered(cart))
}
export const updateCartItem = (cart, plus=true) => async (dispatch, getStore) => {
	const data = getStore().product.cartItems.find(item => item._id === cart._id)
	const quantity = plus ? data.quantity + 1 : data.quantity - 1
	dispatch( actions.cartItemUpdated({ ...data, quantity}) )
}
export const removeCartItems = () => (dispatch) => {
	dispatch(actions.cartItemsRemoved())
}

export const getTotalPrice = () => (dispatch) => {
	dispatch(actions.totalPrice())
}



export const addProduct = (obj, token) => catchAsyncDispatch( async (dispatch) => {
	dispatch(actions.requested())
	const { data: { product } } = await axios.post('/api/products', obj, { headers: {Authorization: `Bearer ${token}`} })
	dispatch(actions.productAdded(product))
}, actions.failed)








/*
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

*/
