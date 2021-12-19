import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchSearch } from '../store/userReducer'

import Grid from '@mui/material/Grid'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import SearchIcon from '@mui/icons-material/Search'


const options = ['one', 'two', 'three', 'four']


const Search = () => {
	const dispatch = useDispatch()

	const { search } = useSelector(state => state.user)
	useEffect(() => {
		dispatch(dispatchSearch(options[0]))
	}, [])

	const searchChangeHandler = (evt, newValue) => dispatch(dispatchSearch(newValue))
	const submitHandler = (evt) => {
		evt.preventDefault()

		console.log({search})
	}

	return (
		<Grid container>
			<Grid item xs={12} sm={6}>
				<form onSubmit={submitHandler}>
					<Autocomplete
						options={options}
						getOptionLabel={option => option}
						renderInput={params => <TextField {...params}
							placeholder='Search for ...'
							autoFocus
						/>}
						onChange={searchChangeHandler}
						value={search}
					/>
				</form>
			</Grid>
		</Grid>
	)
}
export default Search
