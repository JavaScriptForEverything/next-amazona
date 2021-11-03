import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'

const { reducer, actions } = createSlice({
	name: 'product',
	initialState: {
		loading: false,
		error: '',
		authenticated: false
	},
	reducers: {
		requested: (state, action) => ({ ...state, loading: true }),
		error: (state, action) => ({
			...state,
			loading: false,
			error: action.payload
		}),
		gotMe: (state, action) => ({
			...state,
			loading: false,
			...action.payload
		}),
	},

	extraReducers: {
		[HYDRATE]: (state, action) => ({ ...state, ...action.payload }),
	}
})
export default reducer


export const getMe = () => async (dispatch, getStore) => {
	dispatch(actions.requested())

	const { data } = await axios.get('https://api.github.com/users/robitops10')

	dispatch(actions.gotMe( data ))
}

