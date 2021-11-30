import { createSlice } from '@reduxjs/toolkit'
import { catchAsyncDispatch } from '../util'
import axios from 'axios'


const { reducer, actions } = createSlice({
	name: 'dialog',
	initialState: {
		loading: false,
		error: '',
		open: false,
		severity: 'success',
		message: '',

		cartItems: (typeof window !== 'undefined') && JSON.parse(localStorage.getItem('cartItems')) || [],
		shippingCharge: 0,
		totalPrice: 0,
	},
	reducers: {
		requested: (state, action) => ({ ...state, loading: true }),
		failed: (state, action) => ({
			...state,
			loading: false,
			error: action.payload,
			// open: true
		}),
		showAlert: (state, action) => ({
			...state, loading: false, ...action.payload
		}),

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
		})

	} // end of reducer method
})
export default reducer



export const showAlert = (obj) => (dispatch) => {
	dispatch(actions.requested())
	dispatch(actions.showAlert(obj))
}

export const addItemToCart = (cart) => (dispatch) => {
	dispatch(actions.requested())
	dispatch(actions.cartItemAdded(cart))
}
export const filterCartItems = (cart) => (dispatch) => {
	dispatch(actions.requested())
	dispatch(actions.cartItemsFiltered(cart))
}
export const updateCartItem = (cart, plus=true) => async (dispatch, getStore) => {
	// const { data } = await axios.get(`/api/products/${cart.slug}`)
	const data = getStore().dialog.cartItems.find(item => item._id === cart._id)
	const quantity = plus ? data.quantity + 1 : data.quantity - 1
	dispatch( actions.cartItemUpdated({ ...data, quantity}) )
}
export const removeCartItems = () => (dispatch) => {
	dispatch(actions.cartItemsRemoved())
}

export const getTotalPrice = () => (dispatch) => {
	dispatch(actions.totalPrice())
}


/*
export const getProductBySlug = (req, slug) => catchAsyncDispatch( async (dispatch) => {
	// dispatch(actions.requested())

	const { origin } = absoluteUrl(req)
	const { data } = await axios.get(`${origin}/api/products/${slug}`)

	console.log(data)

	dispatch(actions.productBySlug( data ))
}, actions.failed)

*/
