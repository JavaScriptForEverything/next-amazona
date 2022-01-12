import { useState } from 'react'

import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

const fieldCreator = (label, name, type='text') => ({label, name, type})
const userInputs = [
	// { label: 'Your Name', name: 'username', type: 'text' },
	fieldCreator('Your Name', 'username'),
	fieldCreator('Email Address', 'email', 'email'),
	fieldCreator('Avatar', 'avatar', 'file'),
	fieldCreator('Title', 'title'),
	fieldCreator('Description', 'description', 'textarea'),
]

const Settings = () => {
	const [ fields, setFields ] = useState({
		username: '',
		email: '',
		avatar: '',
	})

	const [ fieldsError, setFieldsError ] = useState({
		// name: 'no text found'
	})


	const changeHandler = (evt, name) => {
		setFields({ ...fields, [name]: evt.target.value })
	}

	console.log(userInputs)

	return (
		<>
			<Paper>
				{userInputs.map((field, key) => <TextField key={key}
					label={field.label}
					InputLabelProps={{ shrink: true }}
					margin='dense'

					type={field.type}
					value={fields[field.name]}
					onChange={evt => changeHandler(evt, field.name)}

					multiline
					// rows={field.type === 'textarea' ? 3 : 1}

					error={!!fieldsError[field.name] || !fields[field.name]}
					helperText={fieldsError[field.name]}
				/>
					)}
			</Paper>
		</>
	)
}
export default Settings
