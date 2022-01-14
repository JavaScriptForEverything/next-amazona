import { useState, useEffect } from 'react'
import { isEmail } from 'validator'


import Layout from '../layout'
import Typography from '@mui/material/Typography'


import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
// import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'

// { label: 'Your Name', name:'name', type:'text', options: [], image: true }
const fieldObjectCreator = (label, name, type='text', image=true, options) => ({label, name, type, image, options})

// this function return promise, replace old one in util.index.js with this one.
const readAsDataURL = (file, isImage=true) => new Promise((resolve, reject) => {
	const image = file.type.match('image/*')

	if(isImage && !image) return console.error('Please select only image.')
	if(!isImage && image) return console.error('Please don\'t select image.')

	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = () => reader.readyState === 2 && resolve(reader.result)
})

// profile update
const userInputs = [
	fieldObjectCreator('Your Name', 'username'),  // (label, name, type='text', image=true, options)
	fieldObjectCreator('Email Address', 'email', 'email'),
	fieldObjectCreator('Avatar', 'avatar', 'file'),
	fieldObjectCreator('Title', 'title'),
	fieldObjectCreator('Description', 'description', 'textarea'),
	fieldObjectCreator('Skill', 'skill', 'text', true, ['ReactJS', 'Redux', 'Material-UI', 'NodeJS', 'MongoDB', 'ExpressJS']),
	fieldObjectCreator('Phone Number', 'phone'),
	fieldObjectCreator('Age', 'age', 'number'),
	fieldObjectCreator('Resume', 'resume', 'file', false),
]

// get object to use in useState(getNameFieldOfArrayObject(userInputs))
const getNameFieldOfArrayObject = (arr=[], field ) => {
	const tempObj = {}
	arr.forEach(obj => tempObj[obj.name] = field ? obj[field] : '')

	return tempObj
}


const formValidator = (obj, errorStateUpdateMethod, requireLength=4) => {
	const errorObj = {}

	if( obj.username && obj.username.length < 4)  errorObj.username = 'name reqired 4 digit long'
	if( obj.email && !isEmail(obj.email) ) errorObj.email = 'Invalid Email address'

	if(obj.password && obj.password.length < requireLength ) errorObj.password = `Password must be ${requireLength} character long`
	if(obj.password && obj.confirmPassword && obj.password !== obj.confirmPassword) errorObj.confirmPassword = 'Confirm Password not matched'

	Object.entries(obj).forEach(([key, value]) => {
		if(`${value}`.trim() === '')  errorObj[key] = `'${key}' field is empty`
	})

	errorStateUpdateMethod(errorObj)
	return Object.keys(errorObj).every(item => item === '')
	// it should be Object.values() but still works fine
}



const About = () => {
	const [ fields, setFields ] = useState(getNameFieldOfArrayObject(userInputs))
	const [ fieldsError, setFieldsError ] = useState({})
	const [ imageObj, setImageObj ] = useState({}) 					// to store image as dataURL

	// profile update
	const changeHandler = async (evt, name, type, isImage, newValue) => {
		/* Error: InvalidStateError: An attempt was made to use an object that is not, or is no longer, usable
				if we try to set file value in state, it throw error, because the file take some time to read
				min-while browser set object (and object is placed in DOM, and dom can't take object)
		 		so it throw error.

			Solve: To solve the problem, we put file value in other state variable and before submit merge the data.

			It solve one problem but create another one, in validation, image field is empty because the of the
			await take some time.

			Solve: We set input value in state before the file read, then read the file. so

			- Original Code:

					const isFile = type.trim() === 'file'
					const file = evt.target?.files?.[0]
					if(file) setImageObj({ ...imageObj, [name]: await readAsDataURL(file, isImage) })

					setFields({ ...fields, [name]: newValue || evt.target.value })


			- Update State First, then Read File:

					setFields({ ...fields, [name]: newValue || evt.target.value })

					const isFile = type.trim() === 'file'
					const file = evt.target?.files?.[0]
					if(file) setImageObj({ ...imageObj, [name]: await readAsDataURL(file, isImage) })
		*/
		setFields({ ...fields, [name]: newValue || evt.target.value })

		const isFile = type.trim() === 'file'
		const file = evt.target?.files?.[0]
		if(file) setImageObj({ ...imageObj, [name]: await readAsDataURL(file, isImage) })
	}

	const fieldSubmitHandler = (evt) => {
		evt.preventDefault()

		// copy imageObj and fields object's properties into new empty Object, which will be send to server
		const isValidated = formValidator(fields, setFieldsError)
		if(!isValidated) return

		const data =  Object.assign({}, fields, imageObj)
		console.log(data)
	}



	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>

				<Paper sx={{ p: 1 }}>
					<Typography variant='h6' color='primary' sx={{ py: 1 }}> Edit Profile </Typography>
					<form noValidate onSubmit={fieldSubmitHandler} >
						{userInputs.map(({ label, name, type, image, options }, key) => Array.isArray(options) ? (
							<Autocomplete key={key}
								options={options}
								getOptionLabel={ option => option }
								renderInput={params => <TextField {...params}
									label={label}
									margin='dense'
									fullWidth
									type={type}

									error={!!fieldsError[name] || !fields[name]}
									helperText={fieldsError[name]}
								/>}
								value={fields[name]}
								onChange={(evt, newValue) => changeHandler(evt, name, type, image, newValue)}
							/>
						) : (
							<TextField key={key}
								label={label}
								InputLabelProps={{ shrink: true }}
								margin='dense'
								fullWidth

								type={type}
								value={fields[name]}
								onChange={evt => changeHandler(evt, name, type, image)}

								multiline={type === 'textarea'}
								rows={type === 'textarea' ? 3 : 1}

								error={!!fieldsError[name] || !fields[name]}
								helperText={fieldsError[name]}
							/>
						))}

						<Box sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							gap: 1,
							py: 2
						}}>
							<Button variant='outlined'>Clear</Button>
							<Button type='submit' variant='contained'>Update</Button>
						</Box>
					</form>
				</Paper>




		</Layout>
	)
}
export default About


