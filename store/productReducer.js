import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'
import nookies from 'nookies'
import absoluteUrl from 'next-absolute-url'

import { catchAsyncDispatch } from '../util'


const { reducer, actions } = createSlice({
	name: 'product',
	initialState: {
		loading: false,
		error: '',
		status: '',

		products: [],
		total:0, 								// Total products available in the database
		// length: 0, 							// already get products from total products
		// // to determine page (not it no need, because we use infinite scrolling, instead of pagination on front-end)
		// countPage: 0,
		product: {},

		brands: [],


		cartItems: (typeof window !== 'undefined') && JSON.parse(localStorage.getItem('cartItems')) || [],
		shippingCharge: 0,
		totalPrice: 0,
	},
	reducers: {
		requested: (state, action) => ({
			...state,
			loading: true,
			error: '',
			status: ''
		}),
		failed: (state, action) => ({
			...state,
			loading: false,
			error: action.payload
		}),
		resetToDefault: (state, action) => ({
			...state,
			loading: false,
			error: '',  										// reset error
			status: '',  										// reset status of success
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
		}),


		// set value from getServerSideProps = wrapper.getServerSideProps( store => ctx => {...})
		getServerSideProducts: (state, action ) => { 				// (1) called in serverSide
		// console.log(action.payload)
			return {
				...state,
				loading: false,
				...action.payload, 															// (2) set in serverSide: 	state.product = action.payload
			}
		},
		getProducts: (state, action) => ({
			...state,
			loading: false,
			...action.payload 																// (3) store serverSide payload into clientSide product
		}),
		addProduct: (state, action) => ({ 		// single product
			...state,
			loading: false,
			status: action.payload.status,
			products: [
				...state.products,
				action.payload.product
			]
		}),
		getBrands: (state, action) => ({
			...state,
			loading: false,
			brands:  action.payload
		}),


		productAddedByFilter: (state, action) => {
			// console.log(action.payload)

			// console.log(state.product.products)
			// console.log(state)

			return {
				...state,
				loading: false,
				products: action.payload
			}
		},


		productsAddedOnScroll: (state, action) => ({
			...state,
			loading: false,
			products: [ ...state.products, ...action.payload.products],
			total: action.payload.total,
			// length: action.payload.length,
		}),

		// getServerSideProps() 	/pages/product/[slug].js
		getProduct: (state, action) => ({...state, loading: false, product: action.payload }),


	},

})
export default reducer

export const { getProducts } = actions


export const resetSlice = () => (dispatch) => dispatch(actions.resetToDefault())

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


// /components/dashboard/products.js 		: useEffect(() => {dispatch(getClientSideProducts()) }, [])
export const getClientSideProducts = () => catchAsyncDispatch( async (dispatch) => {
	dispatch(actions.requested())
	const { data } = await axios.get('/api/products')
	dispatch(actions.getProducts(data))
}, actions.failed)



// getAllProducts will be dispatched here instead of /pages/product.js getServerSideProps
export const getServerSideProducts = (ctx={}) => async (dispatch) => {
	const { resolvedUrl } = ctx

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
	const { data } = await axios.get(url)
	dispatch(actions.getServerSideProducts({ ...data, resolvedUrl }))
}

// getServerSideProps() 	/pages/product/[slug].js
export const getProductBySlug = (ctx) => catchAsyncDispatch( async (dispatch) => {
	const { token } = nookies.get(ctx)
	if(!token) return

	const { origin } = absoluteUrl(ctx.req)
	dispatch(actions.requested())
	const { data: { product } } = await axios.get(`${origin}/api/products/${ctx.params.slug}`, {
		headers: {Authorization: `Bearer ${token}`}
	})
	dispatch(actions.getProduct(product))
}, actions.failed)




// used in /pages/index.js 	=> components/home/leftPanel/*
export const addFilter = (key, value, token) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())
	const { data: { products } } = await axios.get(`/api/products?${key}=${value}`, {headers: { Authorization: `Bearer ${token}` } })
	dispatch(actions.productAddedByFilter(products))
}, actions.failed)




// used in 	/components/dashboard/products.js
export const getProductsXHR = ({ token, page=1, limit=4 }) => catchAsyncDispatch( async (dispatch) => {
	if(!token) return

	// return console.log({ page, limit })

	dispatch(actions.requested())
	const { data } = await axios.get(`/api/products?page=${page}&limit=${limit}`, {headers: { Authorization: `Bearer ${token}` } })
	dispatch(actions.getServerSideProducts(data))

}, actions.failed)

// used in 	/pages/index.js
export const getProductsOnScroll = ({ token, page=1, limit=4 }) => catchAsyncDispatch( async (dispatch) => {
	if(!token) return

	// return console.log({ page, limit })

	dispatch(actions.requested())
	const { data } = await axios.get(`/api/products?page=${page}&limit=${limit}`, {headers: { Authorization: `Bearer ${token}` } })
	dispatch(actions.productsAddedOnScroll(data))

}, actions.failed)


export const addProduct = (fields, token) => catchAsyncDispatch( async (dispatch) => {
	dispatch(actions.requested())
	const { data } = await axios.post('/api/products', fields, { headers: {Authorization: `Bearer ${token}`} })
	dispatch(actions.addProduct(data))
}, actions.failed)


// used in home page left filter section for get all products
export const getProductBrands = (token) => catchAsyncDispatch( async (dispatch) => {
	dispatch(actions.requested())
	const { data: { brands } } = await axios.get('/api/products/brand', { headers: {Authorization: `Bearer ${token}`} })
	dispatch(actions.getBrands(brands))
}, actions.failed)








