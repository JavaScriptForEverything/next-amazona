import { useState, useEffect } from 'react'
import { isEmail } from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../../../store/dialogReducer'
import { updateProfile } from '../../../store/userReducer'

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
	// {label: 'Age', type: 'text', name: 'age'},
	// {label: 'Years Of Experience', type: 'text', name: 'experience'},
	// {label: 'Phone', type: 'text', name: 'phone'},
	// {label: 'CTC', type: 'text', name: 'ctc'},
	// {label: 'Location', type: 'text', name: 'location'},
	{label: 'Resume', type: 'file', name: 'resume'},
]
const basicInfoObj = {}
basicInfoItems.forEach(itemObj => basicInfoObj[itemObj.name] = '')



const FormDialog = ({ open, setOpen }) => {
	const dispatch = useDispatch()

	const [ disabled, setDisabled ] = useState(false)
	const [ isUpdated, setIsUpdated ] = useState(false)

	const [ fields, setFields ] = useState(basicInfoObj)
	const [ fieldsError, setFieldsError ] = useState(basicInfoObj)
	const [ resume, setResume ] = useState()

	const { error, loading, user } = useSelector(state => state.user)
	// console.log(user.location)

	const updateBasicInfoObj = {
	  age: user.age,
	  experience: user.experience,
	  phone: user.phone,
	  ctc: user.ctc,
	  location: user.location && `${user.location.city} ${user.location.country}`,
	  resume: user.resume
	}
	useEffect(() => { 								// fill data from store
		setFields(updateBasicInfoObj)
	}, [])

	useEffect(() => {
		if(error) return dispatch(showAlert({ open: true, severity: 'error', message: error}))
	}, [error])



	const formValidator = (fieldsObj) => {
		const errorsObj = {}
		if(fieldsObj.email &&!isEmail(fieldsObj.email)) errorsObj.email = 'Email address is invalid'

		Object.keys(fieldsObj).forEach((field) => {
			if(fieldsObj[field] === '') 	errorsObj[field] = `${field} field is empty`
		})

		setFieldsError(errorsObj)
		return Object.values(errorsObj).every((field) => field === '' )

		// return errorsObj
	}

	const closeHandler = () => setOpen(false)
	const changeHandler = (evt) => {
		if(evt.target.type === 'file') readAsDataURL(evt.target.files[0], setResume, { pdf: true })

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

		// setIsUpdated(true)
		// setDisabled(true)


		const location = { 													// str => obj: 'Dhaka Bangladesh'
		  city: fields?.location?.split(' ')[0], 			// Dhaka
		  country: fields?.location?.split(' ')[1], 	// Bangladesh
		}

		dispatch(updateProfile({...fields, resume, location }))
		// console.log({...fields, resume, location })
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
							src={user.avatar ? user.avatar.secure_url : ''}
						>
						 { <PersonIcon color='primary' />}
						</Avatar>

						<Typography variant='h6' sx={{ textTransform: 'uppercase'}} >Update Basic Info</Typography>
					</Box>

					{isUpdated && <Alert sx={{mb: 2}} severity='success' color='info'>Basic info updated</Alert> }

					<form onSubmit={submitHandler} noValidate >
						{ basicInfoItems.map(({label, name, type}, key) => <TextField key={key}
							label={label}
							placeholder={label}
							InputLabelProps={{shrink: true}}
							fullWidth
							required
							// required={ type !== 'file' }
							sx={key !== 0 ? {mt: 2} : {}}
							margin='dense'
							autoFocus={key === 0}

							type={type}
							name={name}
							value={fields[name]}
							onChange={changeHandler}
							error={!fields[name] || !!fieldsError[name]}
							// error={ type !== 'file' && !fields[name] || !!fieldsError[name]}
							helperText={fieldsError[name]}

						/>)}
						<Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3}} >
							<Button variant='outlined' disabled={!true} onClick={resetHandler} >Reset</Button>
							<Button variant='contained' type='submit' disabled={disabled} >
								{ (isUpdated ? ( loading ? <CircularProgress size={24} /> : 'Updated') : 'Update') }
							</Button>
						</Box>
					</form>
				</Box>
			</Container>
		</Dialog>
	)
}
export default FormDialog

