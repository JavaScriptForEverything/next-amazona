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

		selected: 0, 						// Drawer select first item by default
	},
	reducers: {
		requested: (state, action) => ({ ...state, error: '', loading: true }),
		failed: (state, action) => ({...state, loading: false, error: action.payload, }),
		showAlert: (state, action) => ({
			...state, loading: false, ...action.payload
		}),

		// drawer item select, else useState reseted on page navigation
		selectedItem: (state, action) => ({ ...state, selected: action.payload})

	} // end of reducer method
})
export default reducer


export const showAlert = (obj) => (dispatch) => {
	dispatch(actions.requested())
	dispatch(actions.showAlert(obj))
}

export const selectItem = (index) => (dispatch) => dispatch(actions.selectedItem(index))



/*
export const getProductBySlug = (req, slug) => catchAsyncDispatch( async (dispatch) => {
	// dispatch(actions.requested())

	const { origin } = absoluteUrl(req)
	const { data } = await axios.get(`${origin}/api/products/${slug}`)

	console.log(data)

	dispatch(actions.productBySlug( data ))
}, actions.failed)

*/
