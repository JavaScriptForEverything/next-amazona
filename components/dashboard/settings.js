import { useState } from 'react'

import { formValidator } from '../../util'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'



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
const passwordInputs = [ 	// change password
	fieldObjectCreator('Current Password', 'currentPassword', 'password'),
	fieldObjectCreator('New Password', 'password', 'password'),
	fieldObjectCreator('Confirm Password', 'confirmPassword', 'password'),
]
const notifications = [
	{ name: 'confirmation', title: 'Order Confirmation', 	subheader: 'you will be notify when customers order any product', selected: true },
	{ name: 'status', 			title: 'Order Status Changed',subheader: 'you will be notify when customers made changed in order', selected: false },
	{ name: 'delivered', 		title: 'Order Delivered', 		subheader: 'you will be notify once order delivered', selected: true },
	{ name: 'email', 				title: 'Email Notification', 	subheader: 'turn on email notifications to get updates through email', selected: true },
]

// get object to use in useState(getNameFieldOfArrayObject(userInputs))
const getNameFieldOfArrayObject = (arr=[], field ) => {
	const tempObj = {}
	arr.forEach(obj => tempObj[obj.name] = field ? obj[field] : '')

	return tempObj
}



const Settings = () => {
	const [ fields, setFields ] = useState(getNameFieldOfArrayObject(userInputs))
	const [ fieldsError, setFieldsError ] = useState({})
	const [ imageObj, setImageObj ] = useState({}) 					// to store image as dataURL

	const [ passwordFields, setPasswordFields ] = useState(getNameFieldOfArrayObject(passwordInputs))
	const [ passwordFieldsError, setPasswordFieldsError ] = useState({})

	const [ notificationFields, setNotificationFields ] = useState(getNameFieldOfArrayObject(notifications, 'selected'))

	// console.log(notificationFields)


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


	// password change
	const passwordChangeHandler = (evt, name) => {
		setPasswordFields({ ...passwordFields, [name]: evt.target.value })
	}
	const passwordSubmitHandler = (evt) => {
		evt.preventDefault()

		const isValidated = formValidator(passwordFields, setPasswordFieldsError)
		if(!isValidated) return

		console.log(passwordFields)
	}


	const switchChangeHandler = (evt, name, selected) => {
		setNotificationFields({ ...notificationFields, [name]: selected })
	}

	return (
		<>
		<Grid container spacing={1}>
			{/*-----[ Left side ]------*/}
			<Grid item xs={12} sm={6}>
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
			</Grid>

			{/*-----[ Right side ]------*/}
			<Grid item xs={12} sm={6}>
				<Paper sx={{ p: 1 }}>
					<Typography variant='h6' color='primary' sx={{ py: 1 }}> Change Password </Typography>
					<form noValidate onSubmit={passwordSubmitHandler} >
						{passwordInputs.map(({ label, name, type }, key) => <TextField key={key}
							label={label}
							InputLabelProps={{ shrink: true }}
							margin='dense'
							fullWidth

							type={type}
							value={passwordFields[name]}
							onChange={evt => passwordChangeHandler(evt, name)}

							error={!!passwordFieldsError[name] || !passwordFields[name]}
							helperText={passwordFieldsError[name]}
						/>
						)}

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

			{/*-----[ Right Bottom: Notification Section ]------*/}
				<Paper sx={{ p: 1, mt: 3 }}>
					<Typography variant='h6' color='primary' sx={{ py: 1 }}> Notification </Typography>

					{notifications.map(({ title, subheader, name }, key) => <Paper key={key}
						sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: 1,
						p: 2,
						mb: .2
					}}>
						<Box>
							<Typography>{title}</Typography>
							<Typography
								variant='body2'
								color='textSecondary'
								sx={{ lineHeight: 1.2 }}
							>{subheader}</Typography>
						</Box>
						<Box>
							<Switch
								checked={notificationFields[name]}
								onChange={(evt, newValue) => switchChangeHandler(evt, name, newValue)}
							/>
						</Box>
					</Paper>
					)}
				</Paper>
			</Grid>
		</Grid>
		</>
	)
}
export default Settings
