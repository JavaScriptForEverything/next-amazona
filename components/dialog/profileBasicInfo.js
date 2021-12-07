import { useState, useEffect } from 'react'
import { isEmail } from 'validator'

import Dialog from '@mui/material/Dialog'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Alert from '@mui/material/Alert'

import ClearIcon from '@mui/icons-material/Clear'
import PersonIcon from '@mui/icons-material/Person'


const basicInfoItems = [
	{label: 'Age', type: 'number', name: 'age'},
	{label: 'Years Of Experience', type: 'number', name: 'experience'},
	{label: 'Phone', type: 'number', name: 'phone'},
	{label: 'CTC', type: 'number', name: 'ctc'},
	{label: 'Location', type: 'text', name: 'location'},
	{label: 'Email Address', type: 'email', name: 'email'},
]
const basicInfoObj = {}
basicInfoItems.forEach(itemObj => basicInfoObj[itemObj.name] = '')



const FormDialog = ({ open, setOpen, user={} }) => {
	const [ disabled, setDisabled ] = useState(false)
	const [ isUpdated, setIsUpdated ] = useState(false)

	const [ fields, setFields ] = useState(basicInfoObj)
	const [ fieldsError, setFieldsError ] = useState(basicInfoObj)

	// // console.log(fieldsError)
	// useEffect(() => {
	// 	if(error) return dispatch(showError())
	// }, [error])

	const formValidator = (fieldsObj) => {
		const errorsObj = {}
		if(fieldsObj.email &&!isEmail(fieldsObj.email)) errorsObj.email = 'Email address is invalid'

		Object.keys(fieldsObj).forEach((field) => {
			if(fieldsObj[field].trim() === '') 	errorsObj[field] = `${field} field is empty`
		})

		setFieldsError(errorsObj)
		return Object.values(errorsObj).every((field) => field === '' )

		// return errorsObj
	}

	const closeHandler = () => setOpen(false)
	const changeHandler = (evt) => {
		setFields({ ...fields, [evt.target.name]: evt.target.value})
	}

	const resetHandler = (evt) => {
		setFields(basicInfoObj) 		// evt.target.form.reset() 		// reset form
		setIsUpdated(false)
		setDisabled(false)
	}
	const submitHandler = (evt) => {
		evt.preventDefault()

		const isValidated = formValidator(fields)
		if(!isValidated) return

		setIsUpdated(true)
		setDisabled(true)
		console.log(fields)
	}

	return (
		<Dialog
			open={open}
			onClose={closeHandler}
			hideBackdrop
			PaperProps={{
				sx: { minWidth: 360 }
			}}
		>
			<Container maxWidth='xs' disableGutters >
				<Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 1, mr: 1}} >
					<IconButton onClick={closeHandler} >
						<ClearIcon />
					</IconButton>
				</Box>

				<Box sx={{pb: 3, px: 2}}>
					<Box sx={{
							mb: 2,
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
							alignItems: 'center'
						}}
					>
						<Avatar sx={{
							width: 80, height: 80,
							border: (theme) => `1px solid ${theme.palette.primary.main}`,
							backgroundColor: 'transparent'
						}}
							src={user.avatar}
						>
						 { <PersonIcon color='primary' />}
						</Avatar>

						<Typography variant='h6' sx={{ textTransform: 'uppercase'}} >Basic Info</Typography>
					</Box>

					{isUpdated && <Alert sx={{mb: 2}} severity='success' color='info'>Basic info updated</Alert> }

					<form onSubmit={submitHandler} noValidate >
						{ basicInfoItems.map(({label, name, type}, key) => <TextField key={key}
							label={label}
							placeholder={label}
							InputLabelProps={{shrink: true}}
							fullWidth
							required
							sx={key !== 0 ? {mt: 2} : {}}
							margin='dense'

							type={type}
							name={name}
							value={fields[name]}
							onChange={changeHandler}
							error={!fields[name] || !!fieldsError[name]}
							helperText={fieldsError[name]}

						/>)}
						<Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3}} >
							<Button variant='outlined' disabled={!true} onClick={resetHandler} >Reset</Button>
							<Button variant='contained' type='submit' disabled={disabled} >
								{ (isUpdated ? 'Updated' : 'Update') }
							</Button>
						</Box>
					</form>
				</Box>
			</Container>
		</Dialog>
	)
}
export default FormDialog

