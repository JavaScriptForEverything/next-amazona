import { createSlice } from '@reduxjs/toolkit'

const { reducer, actions } = createSlice({
	name: 'review',
	initialState: {
		like: 0,
		dislike: 0,
		totalLikes: 400,
		totalDislikes: 20

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
			error: action.payload,
			status: ''
		}),

		likeComment: (state, action) => ({
			...state,
			loading: false,
			error: '',
			...action.payload 				// { status: 'success', like: 1 }
		}),
		dislikeComment: (state, action) => ({
			...state,
			loading: false,
			error: '',
			...action.payload 				// { status: 'success', like: 1 }
		}),
		toAnswerComment: (state, action) => ({
			...state,
			loading: false,
			error: '',
			...action.payload 				// { status: 'success', like: 1 }
		}),

	}
})

export default reducer


export const likeComment = () => (dispatch) => {
	dispatch(actions.requested())

	const data = {
		status: 'success',
		like: 1,
		dislike: -1,
		totalLikes: 401,
		totalDislikes: 19,
	}
	dispatch(actions.likeComment( data ))
}

export const dislikeComment = () => (dispatch) => {
	dispatch(actions.requested())

	const data = {
		status: 'success',
		like: -1,
		dislike: 1,
		totalLikes: 399,
		totalDislikes: 21,
	}
	dispatch(actions.dislikeComment( data ))
}

export const toAnswerComment = () => (dispatch) => {
	dispatch(actions.requested())

	const data = {
		status: 'success',
		like: 0,
		dislike: 0,
		totalLikes: 400,
		totalDislikes: 20,
	}
	dispatch(actions.toAnswerComment( data ))
}
