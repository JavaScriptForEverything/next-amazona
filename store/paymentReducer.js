import { createSlice } from '@reduxjs/toolkit'
import { shippingObj } from '../stripe/data'

const shippingInfo = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('shippingInfo'))


const { reducer, actions } = createSlice({
	name: 'stripe',
	initialState: {
		shippingObj : shippingInfo || shippingObj
	},
	reducers: {
		addedShippingInfo: (state, action) => {
			localStorage.setItem('shippingInfo', JSON.stringify({ ...state.shippingObj, ...action.payload })  )

			return {
				...state,
				shippingObj: action.payload
			}
		}
	}
})
export default reducer


export const addShippingInfo = (obj) => (dispatch) => {
	// console.log( obj )
	dispatch(actions.addedShippingInfo(obj))
}
