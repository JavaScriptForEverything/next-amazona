import { createSlice } from '@reduxjs/toolkit'
import { shippingObj } from '../stripe/data'

const shippingInfo = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('shippingInfo'))


const { reducer, actions } = createSlice({
	name: 'stripe',
	initialState: {
		shippingObj : shippingInfo || shippingObj,
		paymentObj: { currency: 'usd' }
	},
	reducers: {
		addedShippingInfo: (state, action) => {
			localStorage.setItem('shippingInfo', JSON.stringify({ ...state.shippingObj, ...action.payload })  )

			return {
				...state,
				shippingObj: action.payload
			}
		},
		addedPaymentInfo: (state, action) => {

			return {
				...state,
				paymentObj: { ...state.paymentObj, ...action.payload }
			}
		}
	}
})
export default reducer


export const addShippingInfo = (obj) => (dispatch) => {
	dispatch(actions.addedShippingInfo(obj))
}
export const addPaymentInfo = (obj) => (dispatch) => {
	dispatch(actions.addedPaymentInfo(obj))
}
