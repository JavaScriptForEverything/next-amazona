import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteURL from 'next-absolute-url'
import nookies from 'nookies'
import { HYDRATE } from 'next-redux-wrapper'

import { showAlert } from './dialogReducer'
import { catchAsyncDispatch } from '../util'

const	{ token } = nookies.get(null)

const { reducer, actions } = createSlice({
	name: 'user',
	initialState: {
		error: '', 								// Must need to empty error on every request
		loading: false, 					// Required to add loading features
		authenticated: token && !!token || false,
		token: token || '',
		isSignedUp: false,

		user : { 									// set default user value
		  _id: '',
		  username: '',
		  email: '',
		  password: '',
		  isAdmin: false,
		  title: '',
		  description: '',
		  skills: [],
		  phone: 0,
		  age: '',
		  resume: '',
		  location: {
		    address: '',
		    city: '',
		    country: ''
		  },
		  experience: '',
		  experiences: {
		    title: '',
		    subheader: '',
		    status: '',
		    location: '',
		    avatar: '',
		    backgroundColor: '',
		    date: ''
		  }
		}
	},
	reducers: {
		requested: (state, action) => ({
			...state,
			loading: true,
			error: ''  										// empty error before new request
		}),
		failed: (state, action) => ({
			...state,
			loading: false,
			error: action.payload || ''
		}),

		logedIn: (state, action) => {
			const { token } = action.payload
			if(!token) return { ...state, loading: false }

			nookies.set(null, 'token', token, {
				maxAge: 30 * 24 * 60 * 60,
				secure: true, 			// https only except localhost
				// httpOnly: true, 	// remove from document.cookie to read by javascript
				sameSite: 'strict' 	// Stop CORS
			})
			return { ...state, loading: false, authenticated: true, token }
		},
		logedOut: (state, action) => {
			nookies.destroy(null, 'token', { path: '/'})
			return {...state, loading: false, authenticated: false, isSignedUp: false, user: {}, token: undefined }
		},
		signedUp: (state, action) => ({ ...state, loading: false, isSignedUp: !!action.payload }),

		tokenSent: (state, action) => ({ ...state, loading: false }),
		getMe: (state, action) => ({ // this method used to dispatch on SSR, which pass data to extraReducers [HYDRATE]
			...state,
			loading: false,
			...action.payload
		}),
		profileUpdated: (state, action) => {
			return {
				...state,
				loading: false,
				user: {...action.payload}
			}
		},
		passwordUpdated: (state, action) => {

			const { token } = action.payload

			if(!token) return { ...state, loading: false }
			// localStorage.setItem('token', token)

			return { ...state, loading: false, authenticated: true }
		},


	}, // End of Reducer
	extraReducers: {
		[HYDRATE]: (state, action) => ({
			...state, ...action.payload
			// ...state, ...action.payload.user
		})
	}
})
export default reducer


export const loginMe = (obj) => catchAsyncDispatch(async (dispatch, getStore) => {
	dispatch(actions.requested())
	const { data } = await axios.post(`/api/users/login`, obj)

	dispatch(actions.logedIn(data))
}, actions.failed)

/*Geting User but how ? By sending token as cookie or Brearer token
	1. as header: { Authorization : `Bearer ${token}` }
	2. as header: { cookie : token } */
export const getUser = (token) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())
	const { data } = await axios.get(`/api/users/me`, { headers: {Authorization: `Bearer ${token}`} })
	dispatch(actions.getMe(data))
}, actions.failed)

export const updateProfile = (obj) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())
	const { data: { user } } = await axios.patch(`/api/users/me`, obj, { headers: {Authorization: `Bearer ${token}`} })
	dispatch(actions.profileUpdated(user))
}, actions.failed)



export const logoutMe = () => (dispatch) => dispatch(actions.logedOut())
export const signUpMe = (obj) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())
	const { data } = await axios.post('/api/users/signup', obj)
	dispatch(actions.signedUp(data))
}, actions.failed)


// Forgot Password function
export const forgotPassword = (obj) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())

	const { data }  = await axios.post('/api/users/forgot-password', obj)
	// console.log({data, status})

	const message = 'No token found'
	if(!data || data.status !== 'success') return dispatch(showAlert({ open: true, severity: 'error', message}))
	// if(!data) return dispatch(showAlert({ open: true, severity: 'error', message}))

	dispatch(showAlert({ open: true, severity: 'success', message: data.message }))
	dispatch(actions.tokenSent())
}, actions.failed)



// Reset Password function
export const resetPassword = (obj) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())

	// we used patch request on Backend, to this route, don't know why ?
	// Perhapse 2 route matches same signeture.
	// const { data } = await axios.post(`/api/users/reset-password/`, obj.token)
	const { data } = await axios.patch(`/api/users/forgot-password/`, obj)
	console.log( data )

	if( !data ) return dispatch(showAlert({ open: true, severity: 'error', message}))

	const message = 'Password reset successfully !!!'
	dispatch(showAlert({ open: true, severity: 'success', message}))
	dispatch(actions.tokenSent())
}, actions.failed)













// Not Used Yet: (Need to fix it)

// export const profileUpdate = (obj) => catchAsyncDispatch(async (dispatch) => {
// 	dispatch(actions.requested())

// 	// const { data } = await axios.patch(`/api/users/update-me`, obj)
// 	dispatch(actions.profileUpdated())
// 	return console.log('Next time fix it')

// 	// let message = 'Can\' update, something wrong on backend-side'
// 	// if( data.status !== 'success' ) return dispatch(showAlert({ open: true, severity: 'error', message}))

// 	// message = 'Profile updated successfully !!!'
// 	// dispatch(showAlert({open: true, severity: 'success', message}))

// }, actions.failed)

// export const updatePassword = (obj) => catchAsyncDispatch(async (dispatch) => {
// 	dispatch(actions.requested())

// 	const { data } = await axios.patch(`/api/users/update-my-password`, obj)
// 	// return console.log('Next time fix it')

// 	let message = 'No Token found after update user'
// 	if( !data.token ) return dispatch(showAlert({ open: true, severity: 'error', message}))

// 	message = 'Password updated successfully !!!'
// 	dispatch(showAlert({open: true, severity: 'success', message}))

// 	dispatch(actions.passwordUpdated(data))

// }, actions.failed)







