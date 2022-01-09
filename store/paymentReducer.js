import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { catchAsyncDispatch } from '../util'
import { shippingObj } from '../stripe/data'

const shippingInfo = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('shippingInfo'))


const { reducer, actions } = createSlice({
	name: 'payment',
	initialState: {
		loading: false,
		error: '',

		shippingObj : shippingInfo || shippingObj,
		paymentObj: { currency: 'usd' },

		orders: [],
		countPage: 0,
	},
	reducers: {
		requested: (state, action) => ({...state, loading: true, error: '' }),
		failed: (state, action) => ({...state, loading: false, error: action.payload }),

		addedShippingInfo: (state, action) => {
			localStorage.setItem('shippingInfo', JSON.stringify({ ...state.shippingObj, ...action.payload })  )

			return { ...state, shippingObj: action.payload }
		},
		addedPaymentInfo: (state, action) => ({
			...state,
			paymentObj: { ...state.paymentObj, ...action.payload }
		}),

		ordersAdded: (state, action) => ({
			...state,
			loading: false,
			orders: action.payload.orders,
			countPage: action.payload.countPage
		})
	}
})
export default reducer


export const addShippingInfo = (obj) => (dispatch) => {
	dispatch(actions.addedShippingInfo(obj))
}
export const addPaymentInfo = (obj) => (dispatch) => {
	dispatch(actions.addedPaymentInfo(obj))
}



export const getOrders = (token, queryObj={}) => catchAsyncDispatch( async (dispatch) => {

	let { page, limit, sort, fields, search, category, createdAt } = queryObj

	let query = `page=${page || 1}`
	if(limit) 		query = `${query}&limit=${limit || 4}`
	if(sort) 			query = `${query}&sort=${sort}`
	if(search) 		query = `${query}&search=${search}`
	if(fields) 		query = `${query}&fields=${fields}`
	// if(category) 	query = `${query}&category=${category}`
	// if(createdAt) query = `${query}&createdAt=${createdAt}`

	console.log(query)

	dispatch(actions.requested())
	const { data } = await axios.get(`/api/payments?${query}`, { headers: { Authorization: `Bearer ${token}`}})

	dispatch(actions.ordersAdded( data ))
}, actions.failed)
