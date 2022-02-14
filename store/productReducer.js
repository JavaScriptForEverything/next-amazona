import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'
import nookies from 'nookies'
import absoluteUrl from 'next-absolute-url'

import { catchAsyncDispatch } from '../util'


const { reducer, actions } = createSlice({
	name: 'product',
	initialState: {
		products: [],
		total:0,
		length: 0,
		countPage: 0,
		// product: {},

		brands: [],

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
		}),
		getBrands: (state, action) => ({
			...state,
			loading: false,
			brands:  action.payload
		}),


		allProductsAdded: (state, action ) => ({
			...state,
			loading: false,
			// products: action.payload.products,
			// countPage: action.payload.countPage
			...action.payload
		}),
		productsAddedOnScroll: (state, action) => ({
			...state,
			loading: false,
			products: state.products.concat(action.payload)
		})

	},

	extraReducers: { 	// Dy drade all else, some state will be removed
		[HYDRATE]: (state, action) => ({ ...state, ...action.payload }),
	}
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



// getAllProducts will be dispatched here instead of /pages/product.js getServerSideProps
export const getAllProducts = (ctx={}) => async (dispatch) => {
	const { token } = nookies.get(ctx)
	if(!token) return

	const queryObj = ctx.query || {}

	let query = `page=${queryObj.page || 1}`
	if(queryObj.limit) 		query = `${query}&limit=${queryObj.limit || 4}`
	if(queryObj.sort) 		query = `${query}&sort=${queryObj.sort}`
	if(queryObj.fields) 	query = `${query}&fields=${queryObj.fields}`
	if(queryObj.search) 	query = `${query}&search=${queryObj.search}`
	if(queryObj.brand) 		query = `${query}&brand=${queryObj.brand}`

	if(queryObj.price) 		query = `${query}&price=${queryObj.price}`
	if(queryObj.ratings) 	query = `${query}&ratings=${queryObj.ratings}`
	if(queryObj.category) query = `${query}&category=${queryObj.category}`
	if(queryObj.size) 		query = `${query}&size=${queryObj.size}`
	// if(common) 		query = `${query}&common=${common}`

	let url = `/api/products?${query}`

	const { origin } = absoluteUrl(ctx?.req)
	if(origin) url = origin + url

	dispatch(actions.requested())
	const { data } = await axios.get(url, {headers: { Authorization: `Bearer ${token}` } })
	dispatch(actions.allProductsAdded(data))
}


// used in 	/components/dashboard/products.js
export const getProductsXHR = ({ token, page=1, limit=4 }) => catchAsyncDispatch( async (dispatch) => {
	if(!token) return

	// return console.log({ page, limit })

	dispatch(actions.requested())
	const { data } = await axios.get(`/api/products?page=${page}&limit=${limit}`, {headers: { Authorization: `Bearer ${token}` } })
	dispatch(actions.allProductsAdded(data))

}, actions.failed)

// used in 	/pages/index.js
export const getProductsOnScroll = ({ token, page=1, limit=4 }) => catchAsyncDispatch( async (dispatch) => {
	if(!token) return

	// return console.log({ page, limit })

	dispatch(actions.requested())
	const { data: { products } } = await axios.get(`/api/products?page=${page}&limit=${limit}`, {headers: { Authorization: `Bearer ${token}` } })
	dispatch(actions.productsAddedOnScroll(products))

}, actions.failed)

// getProduct will be dispatched here instead of /pages/product/[id].js getServerSideProps


export const addProduct = (obj, token) => catchAsyncDispatch( async (dispatch) => {
	dispatch(actions.requested())
	const { data: { product } } = await axios.post('/api/products', obj, { headers: {Authorization: `Bearer ${token}`} })
	dispatch(actions.productAdded(product))
}, actions.failed)


export const getProductBrands = (token) => catchAsyncDispatch( async (dispatch) => {
	dispatch(actions.requested())
	const { data: { brands } } = await axios.get('/api/products/brand', { headers: {Authorization: `Bearer ${token}`} })
	dispatch(actions.getBrands(brands))
}, actions.failed)




