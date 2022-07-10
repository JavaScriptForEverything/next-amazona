import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'

import nookies from 'nookies'

import { showAlert } from './dialogReducer'
import { catchAsyncDispatch } from '../util'

const	{ token } = nookies.get(null)

const { reducer, actions } = createSlice({
	name: 'user',
	initialState: {
		error: '', 								// Must need to empty error on every request
		loading: false, 					// Required to add loading features
		authenticated: false,
		token: token || '',

		status: '', 							// 'success' || 'error' || 'failed'

		isExperienceAdd: true, 		// to enable add/update experience form
		edit: '', 								// to make edit dialog based on it value
		message: '', 							// email sent message
		search: '', 							// to store input search

		users: [],
		countPage: 0, 						// totalUsers / limit

		user : { }
	},
	reducers: {
		requested: (state, action) => ({
			...state,
			loading: true,
			error: '',  										// reset error
			status: '',  										// reset status of success 
		}),
		failed: (state, action) => ({
			...state,
			loading: false,
			error: action.payload || ''
		}),
		resetToDefault: (state, action) => ({
			...state,
			loading: false,
			error: '',  										// reset error
			status: '',  										// reset status of success 
		}),
		authenticateUser: (state, action) => ({
			...state,
			status: '',  										// reset status of success 
			authenticated: true
		}),

		experienceFeature: (state, action) => ({ ...state, isExperienceAdd: action.payload}),
		profileEdited: (state, action) => ({ ...state, edit: action.payload}),

		signedUp: (state, action) => ({ ...state, loading: false, status: action.payload }),
		loginUser: (state, action) => ({ 
			...state, 
			loading: false, 
			authenticated: true, 					
			...action.payload, 						// { status: 'success', user: { ... }}
		}),
    addUserToStore: (state, action) => ({
      ...state,
      loading: false,
      authenticated: true,
      user: action.payload
    }),
    logoutUser: (state, action) => ({
      ...state,
      loading: false,
      authenticated: false,
      user: {}
    }),


		tokenSent: (state, action) => ({ ...state, loading: false }),
		getUserById: (state, action) => ({
			...state,
			loading: false,
			user: {
				...state.user,
				...action.payload,
			}
		}),
		// getMe: (state, action) => {
		// 	console.log(action.payload)
		// 	return {
		// 		...state,
		// 		loading: false,
		// 	}
		// },
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
			// user: {},
			user: {
				user: {}
			},
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
		[HYDRATE]: (state, action) => {
		/* How Server-Side dispatch work ?
				. Every server-side dispatch run there payload as regular dispatch do but
				. Server side dispatch directly not effect local storage, instead create new copy of entire store
				. and in [HYDRATE] we decide which Client-Side slice will be updated from the copied store
		*/

			// console.log({ ExtraReducers: action.payload })
			return {
				...state, 
				...action.payload 
				// ...action.payload.user 		// Only update Client-Side user slice from server-side dispatch
			}
		}
	}
})
export default reducer


// /layout/snackbar.js: 	closeHandler=() => {...}
export const resetUserSlice = () => (dispatch) => dispatch(actions.resetToDefault())

// /pages/login.js: 		useEffect( => {...}, [])
export const authenticateUser = () => (dispatch) => {
	dispatch(actions.authenticateUser())
}



// /* /pages/api/users/me.js: .get(authController.getMe)
// 	/layout/index.js: useEffect() */
// export const getUser = (req) => catchAsyncDispatch(async (dispatch) => {
// 	const { origin } = absoluteUrl(req)

// 	// console.log('getUser(req) from userReducer')

// 	dispatch(actions.requested())
// 	const { data: { user } } = await axios.get(`${origin}/api/users/me`)
// 	// console.log({ user })
// 	dispatch(actions.getMe(user))
// }, actions.failed)


// /pages/user/profile.js 	= wrapper.getServerSideProps(...) 
export const getUserById = (req, id) => catchAsyncDispatch(async (dispatch) => {
	const { origin } = absoluteUrl(req)

	dispatch(actions.requested())
	const { data: { user } } = await axios.get(`${origin}/api/users/${id}`)
	// console.log( 'getUserById: (from userReducer)', user )
	dispatch(actions.getUserById(user))
}, actions.failed)

// updateUserUser
export const updateUserInStore = (user) => (dispatch) => {
	dispatch(actions.getUserById(user))
}

//  ?
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
export const updateProfile = (fields, userId) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())
	const { data: { user } } = await axios.patch(`/api/users/${userId}`, fields )
	dispatch(actions.profileUpdated(user))
}, actions.failed)

// ?
export const updateMyPassword = (obj, token) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())
	const { data: { message } } = await axios.patch(`/api/users/update-my-password`, obj, { headers: {Authorization: `Bearer ${token}`} })

	nookies.destroy(null, 'token')
	dispatch(actions.passwordUpdated(message))
}, actions.failed)


// ?
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



// /pages/signup.js: submitHandler: () => { ... }
export const signUpMe = (fields) => catchAsyncDispatch(async (dispatch) => {
	dispatch(actions.requested())
	const { data: { status } } = await axios.post('/api/users/signup', fields)
	dispatch(actions.signedUp(status))
}, actions.failed)

// /pages/login.js: 		submitHandler=() => {...}
export const loginUser = (fields) => catchAsyncDispatch(async (dispatch, getStore) => {
	dispatch(actions.requested())
	const { data } = await axios.post(`/api/users/login`, fields)
	dispatch(actions.loginUser(data))

	localStorage.setItem('user', JSON.stringify(data.user))
}, actions.failed)

// /layout/index.js => useEffect()
export const addUserToStore = () => (dispatch) => {
	let user = localStorage.getItem('user')
			user = user && JSON.parse(user)

	const isUser = user && Object.keys(user).length
	if(isUser) dispatch(actions.addUserToStore(user))
}


// /layout/index.js: 	menuItemHandler = () => {} 
export const logoutUser = () => catchAsyncDispatch(async(dispatch) => {
	await axios.post(`/api/users/logout`, {}) 		// 1. Remove token from cookie

	dispatch(actions.requested())
	dispatch(actions.logoutUser()) 								// 2. make { ..., authenticated: false } in store

  localStorage.removeItem('user') 							// 3. remove user from localStorage

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


