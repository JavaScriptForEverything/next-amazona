import nookies from 'nookies'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getAllProducts, addFilter } from '../../../store/productReducer'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

import SearchIcon from '@mui/icons-material/Search'

const Search = ({ sx={} }) => {
	const dispatch = useDispatch()
	const router = useRouter()
	const [ value, setValue ] = useState('')

	const { token } = nookies.get(null)

	const changeHandler = (evt) => setValue(evt.target.value)
	const submitHandler = (evt) => {
		evt.preventDefault()

		const search = ['name', value]

		if(!value) {
			router.push('/', undefined, {shallow: true})
			dispatch(getAllProducts())

			return
		}

		// 1. add location.query 		so that page refresh get same result by getAllProduct with api features
		// 		shallow push won't page refresh on same page by search
		router.push(`?search=${search}`, undefined, {shallow: true})

		// 2. actually search happend here asynchorously:
		dispatch(addFilter('search', search, token)) 	// key, value, token
	}

	return (
		<form noValidate onSubmit={submitHandler}>
			<TextField
				placeholder='Searcing...'
				fullWidth
				autoFocus
				margin='dense'
				InputProps={{
					endAdornment: <InputAdornment position='end'>
						<IconButton onClick={submitHandler}> <SearchIcon color='primary' /> </IconButton>
					</InputAdornment>
				}}
				onChange={changeHandler}
				value={value}
				// sx={{display: { xs: 'block', md: 'none' } }}
				sx={sx}
			/>
		</form>
	)
}
export default Search
