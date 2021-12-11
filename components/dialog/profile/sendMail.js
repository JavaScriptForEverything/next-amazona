import { useState, useEffect } from 'react'
import { isEmail } from 'validator'
import { useSelector } from 'react-redux'

import { readAsDataURL } from '../../../util'

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
import CircularProgress from '@mui/material/CircularProgress'

import ClearIcon from '@mui/icons-material/Clear'
import PersonIcon from '@mui/icons-material/Person'


const basicInfoItems = [
	{label: 'Receipence', type: 'email', name: 'email'},
	{label: 'Subject', type: 'text', name: 'subject'},
	{label: 'Message', type: 'text', name: 'message'},
	{label: 'File Attach', type: 'file', name: 'file'},
]
const basicInfoObj = {}
basicInfoItems.forEach(itemObj => basicInfoObj[itemObj.name] = '')


const FormDialog = ({ open, setOpen }) => {
	const [ disabled, setDisabled ] = useState(false)
	const [ isUpdated, setIsUpdated ] = useState(false)

	const [ fields, setFields ] = useState(basicInfoObj)
	const [ fieldsError, setFieldsError ] = useState(basicInfoObj)
	const [ file, setFile ] = useState('')

	const { loading, error, user } = useSelector(state => state.user)
	// console.log({ loading, error, user })

	const formValidator = (fieldsObj) => {
		const errorsObj = {}
		if(fieldsObj.email &&!isEmail(fieldsObj.email)) errorsObj.email = 'Email address is invalid'

		Object.keys(fieldsObj).forEach((field) => {
			if( field !== 'file' && fieldsObj[field].trim() === '') 	errorsObj[field] = `${field} field is empty`
		})

		setFieldsError(errorsObj)
		return Object.values(errorsObj).every((field) => field === '' )
	}

	const closeHandler = () => setOpen(false)
	const changeHandler = async (evt) => {
		setFields({ ...fields, [evt.target.name]: evt.target.value })
		if(evt.target.type === 'file') readAsDataURL(evt.target.files[0], setFile, false) // true: 'image' ? 'file'
	}

	const resetHandler = (evt) => {
		setFields(basicInfoObj) 		// evt.target.form.reset() 		// reset form
		setIsUpdated(false)
		setDisabled(false)
		setFile('')
	}
	const submitHandler = (evt) => {
		evt.preventDefault()

		// const isValidated = formValidator(fields)
		// if(!isValidated) return

		// setIsUpdated(true)
		// setDisabled(true)

		console.log({ ...fields, file })
		// dispatch(updateProfile({ ...fields, file }))
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

						<Typography variant='h6' sx={{ textTransform: 'uppercase'}} >Contact Us</Typography>
					</Box>

					{isUpdated && <Alert sx={{mb: 2}} severity='success' color='info'> Mail send to '{fields.email}'</Alert> }

					<form onSubmit={submitHandler} noValidate >
						{ basicInfoItems.map(({label, name, type}, key) => <TextField key={key}
							label={label}
							placeholder={label}
							InputLabelProps={{shrink: true}}
							fullWidth
							required={name !== 'file' }
							sx={key !== 0 ? {mt: 2} : {}}
							margin='dense'

							type={type}
							name={name}
							value={fields[name]}
							onChange={changeHandler}
							error={ type === 'file' ? false : (!fields[name] || !!fieldsError[name]) }
							helperText={fieldsError[name]}

							multiline={name === 'message'}
							rows={3}

						/>)}

						<Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3}} >
							<Button variant='outlined' disabled={!true} onClick={resetHandler} >Reset</Button>
							<Button variant='contained' type='submit' disabled={disabled} >
								{ isUpdated ? 'Mail Sent' : (loading ? <CircularProgress size={24} style={{color: 'white'}} /> : 'Send Mail') }
							</Button>
						</Box>
					</form>
				</Box>
			</Container>
		</Dialog>
	)
}
export default FormDialog

