import { useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const options = ['one', 'two']

const CommonFilter = ({ ...params }) => {
	const [ value, setValue ] = useState(options[0])

	const changeHandler = (evt, newValue) => {
		setValue(newValue)
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
