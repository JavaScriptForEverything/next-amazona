import { useState, useEffect } from 'react'
import { isEmail } from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../store/userReducer'

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


const experiences = [
	{label: 'Job Title', type: 'text', name: 'title'},
	{label: 'Company Name', type: 'text', name: 'companyName'},
	{label: 'Joining Date', type: 'date', name: 'joiningDate'},
	{label: 'Current Status', type: 'text', name: 'currentStatus'},
	{label: 'Job Location', type: 'text', name: 'jobLocation'},
	{label: 'Logo Color', type: 'color', name: 'logoBackgroundColor'},
]
const experienceObj = {}
experiences.forEach(itemObj => experienceObj[itemObj.name] = '')



// if update=true then used as update form else update as add Form
const FormDialog = ({ open, setOpen, experienceId }) => {
	const dispatch = useDispatch()

	const [ disabled, setDisabled ] = useState(false)
	const [ isUpdated, setIsUpdated ] = useState(false)

	const [ fields, setFields ] = useState(experienceObj)
	const [ fieldsError, setFieldsError ] = useState(experienceObj)

	const { loading, error, user, isExperienceAdd } = useSelector(state => state.user)
	// console.log({ loading, error, user })
	// console.log(user.experiences)



	// set user value for update form
	useEffect( async () => {
		const currentObj = await user.experiences && user.experiences.find(item => item._id === experienceId)
		if(!isExperienceAdd && currentObj) await setFields({ ...fields, ...currentObj, joiningDate: new Date(currentObj.joiningDate) })
	}, [experienceId])


	const formValidator = (fieldsObj) => {
		const errorsObj = {}
		if(fieldsObj.email &&!isEmail(fieldsObj.email)) errorsObj.email = 'Email address is invalid'

		Object.keys(fieldsObj).forEach((field) => {
			if(fieldsObj[field].trim() === '') 	errorsObj[field] = `${field} field is empty`
		})

		setFieldsError(errorsObj)
		return Object.values(errorsObj).every((field) => field === '' )
	}


	const changeHandler = (evt) => {
		setFields({ ...fields, [evt.target.name]: evt.target.value})
	}

	const resetHandler = () => {
		setFields(experienceObj) 		// evt.target.form.reset() 		// reset form
		setIsUpdated(false)
		setDisabled(false)
	}
	const closeHandler = () => {
		resetHandler()
		setOpen(false)
	}
	const submitHandler = (evt) => {
		evt.preventDefault()

		const isValidated = formValidator(fields)
		if(!isValidated) return

		setIsUpdated(true)
		setDisabled(true)

		if(isExperienceAdd) { 	// handle add features
			dispatch(updateProfile({ experiences: user.experiences.concat(fields) }))

		} else { 			// handle update features
			dispatch(updateProfile({ experiences: user.experiences
				.map(item => item._id === experienceId ? { ...item, ...fields } : {...item} )}))
		}

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

						<Typography variant='h6' sx={{ textTransform: 'uppercase'}} >
							{isExperienceAdd ? 'Add Experience' : 'Update Experience'}
						</Typography>
					</Box>

					{isUpdated && (
					<Alert sx={{mb: 2}} severity='success' color='info'>
						Experience {isExperienceAdd ? 'added' : 'Updated'} successfully
					</Alert>
					)}

					<form onSubmit={submitHandler} noValidate >
						{ experiences.map(({label, name, type}, key) => <TextField key={key}
							label={label}
							placeholder={label}
							InputLabelProps={{shrink: true}}
							fullWidth
							required
							sx={key !== 0 ? {mt: 2} : {}}
							margin='dense'
							autoFocus={key === 0}

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
								{/*{ (isUpdated ? ( loading ? <CircularProgress size={24}/> : 'Updated') : 'Update') }*/}
								{ loading ? <CircularProgress size={24}/> : (
									isExperienceAdd ? (isUpdated ? 'Added' : 'Add') : (isUpdated ? 'Updated' :	'Update')
								)}
							</Button>
						</Box>
					</form>
				</Box>
			</Container>
		</Dialog>
	)
}
export default FormDialog

