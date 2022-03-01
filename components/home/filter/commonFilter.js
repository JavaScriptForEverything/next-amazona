import nookies from 'nookies'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { addFilter } from '../../../store/productReducer'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const options = ['-price', '-createdAt']

const CommonFilter = ({ ...params }) => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { token } = nookies.get(null)

	const [ value, setValue ] = useState(options[0])

	const changeHandler = (evt, sort) => {
		setValue(sort)
		// console.log({ sort })

		// 1. Work on SSR on page refresh
		router.push(`?sort=${sort}`, undefined, { shallow: true })

		// 2. Work on click on XHR Request
		dispatch(addFilter('sort', sort, token)) 	// key, value, token
	}

	return (
		<Autocomplete
			options={options}
			getOptionLabel={option => option}
			renderInput={ params => <TextField {...params}
				label='Filter By'
				size='small'
			/>}
			value={value}
			onChange={changeHandler}
			{...params}
		/>
	)
}
export default CommonFilter
