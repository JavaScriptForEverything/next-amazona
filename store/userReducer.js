import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
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
		isExperienceAdd: true, 		// to enable add/update experience form
		edit: '', 								// to make edit dialog based on it value
		message: '', 							// email sent message
		search: '', 							// to store input search

		users: [],
		countPage: 0, 						// totalUsers / limit

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
		  experiences: []
		}
	},
	reducers: {
		requested: (state, action) => ({
			...state,
			loading: true,
			error: '',  										// empty error before new request
		}),
		failed: (state, action) => ({
			...state,
			loading: false,
			error: action.payload || ''
		}),

		experienceFeature: (state, action) => ({ ...state, isExperienceAdd: action.payload}),
		profileEdited: (state, action) => ({ ...state, edit: action.payload}),

		logedIn: (state, action) => {
			const { token } = action.payload
			if(!token) return { ...state, loading: false }

			nookies.set(null, 'token', token, {
				maxAge: 30 * 24 * 60 * 60,
				secure: true, 			// https only except localhost
				// httpOnly: true, 	// [Only Server can do it] remove from document.cookie to read by javascript
				// sameSite: 'strict',	// Stop CORS
				path: '/'
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
		allUsersAdded: (state, action) => ({
			...state,
			loading: false,
			users: action.payload.users,
			countPage: action.payload.countPage
		}),
		profileUpdated: (state, action) => {
			return {
				...state,
				loading: false,
				user: {...action.payload}
			}
		},
		passwordUpdated: (state, action) => ({
			...state,
			loading: false,
			authenticated: false,
			token: '',
			user: {},
			message: action.payload
		}),
		userDeleted: (state, action) => {
			nookies.destroy(null, 'token')

			return {
				...state,
				loading: false,
				user: {},
				token: undefined,
				authenticated: false
			}
		},

		mailSended: (state, action) => ({
			...state,
			loading: false,
			message: action.payload
		}),

		searched: (state, action) => ({
			...state,
			loading: false,
			search: action.payload
		}),



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


export const getAllUsers = (token, obj ) => catchAsyncDispatch(async (dispatch) => {
	if(!token) return

	const {
		page=1,
		limit=2,
		search=[]
	} = obj

		console.log({ page, limit })

	let query = ''
	if(page) query += `page=${page}`
	if(limit) query += `&limit=${limit}`
	if(search) query += `&search=${search}`

	dispatch(actions.requested())
	const { data } = await axios.get(`/api/users?${query}`, { headers: {Authorization: `Bearer ${token}`} })
	dispatch(actions.allUsersAdded(data))
}, actions.failed)

/* every place used this function we have to pass token too, but as we use cookie,
 	and backend check 3 place for token, luckyly browser send cooke that why our code wouldn't throw error */
export const updateProfile = (obj, token) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())
	const { data: { user } } = await axios.patch(`/api/users/me`, obj, { headers: {Authorization: `Bearer ${token}`} })
	dispatch(actions.profileUpdated(user))
}, actions.failed)

export const updateMyPassword = (obj, token) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())
	const { data: { message } } = await axios.patch(`/api/users/update-my-password`, obj, { headers: {Authorization: `Bearer ${token}`} })

	nookies.destroy(null, 'token')
	dispatch(actions.passwordUpdated(message))
}, actions.failed)


export const experienceFeature = (isExperienceAdd=true) => (dispatch) => {
	dispatch(actions.experienceFeature(isExperienceAdd))
}
export const editFeature = (value='') => (dispatch) => {
	dispatch(actions.profileEdited(value))
}


// /components/dialog/profile/sendMail.js
export const userMailTo = (obj, token) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())
	const { data: { message } } = await axios.post('/api/users/send-mail', obj, { headers: { Authorization: `Bearer ${token}`} })

	dispatch(actions.mailSended(message))

}, actions.failed)


export const logoutMe = () => (dispatch) => dispatch(actions.logedOut())
export const signUpMe = (obj) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())
	const { data } = await axios.post('/api/users/signup', obj)
	dispatch(actions.signedUp(data))
}, actions.failed)


// Forgot Password function
export const forgotPassword = (obj, token) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())

	const { data }  = await axios.post('/api/users/forgot-password', obj, { headers: { Authorization: `Bearer ${token}`} })
	// console.log({data, status})

	const message = 'No token found'
	if(!data || data.status !== 'success') return dispatch(showAlert({ open: true, severity: 'error', message}))
	// if(!data) return dispatch(showAlert({ open: true, severity: 'error', message}))

	dispatch(showAlert({ open: true, severity: 'success', message: data.message }))
	dispatch(actions.tokenSent())
}, actions.failed)



// Reset Password function
export const resetPassword = (obj, token) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())

	// we used patch request on Backend, to this route, don't know why ?
	// Perhapse 2 route matches same signeture.
	// const { data } = await axios.post(`/api/users/reset-password/`, obj.token)
	const { data } = await axios.patch(`/api/users/forgot-password/`, obj, { headers: { Authorization: `Bearer ${token}`} })
	console.log( data )

	if( !data ) return dispatch(showAlert({ open: true, severity: 'error', message}))

	const message = 'Password reset successfully !!!'
	dispatch(showAlert({ open: true, severity: 'success', message}))
	dispatch(actions.tokenSent())
}, actions.failed)



// Search
export const dispatchSearch = (obj) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())
	// const { data } = await axios.post('/api/users/signup', obj)
	dispatch(actions.searched(obj))
}, actions.failed)



export const deleteUser = (token, fields) => catchAsyncDispatch(async dispatch => {
	if(!token) return

	dispatch(actions.requested())
	const { data } = await axios.patch(`/api/users/delete-me`, fields, { headers: {Authorization: `Bearer ${token}`} })
	// console.log(fields)
	dispatch(actions.userDeleted())
}, actions.failed)


