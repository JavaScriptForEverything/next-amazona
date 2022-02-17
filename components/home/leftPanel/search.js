import { useState } from 'react'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

import SearchIcon from '@mui/icons-material/Search'

const Search = () => {
	const [ value, setValue ] = useState('')


	const changeHandler = (evt) => setValue(evt.target.value)
	const submitHandler = (evt) => {
		evt.preventDefault()
		console.log({ value })
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
				sx={{display: { xs: 'block', md: 'none' } }}
			/>
		</form>
	)
}
export default Search
