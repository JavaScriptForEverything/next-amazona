import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../../../store/dialogReducer'
import { updateProfile } from '../../../store/userReducer'

import { toCapitalize } from '../../../util'

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


const FormDialog = ({ open, setOpen }) => {
	const dispatch = useDispatch()

	const [ disabled, setDisabled ] = useState(false)
	const [ isUpdated, setIsUpdated ] = useState(false)

	const { error, loading, user, edit } = useSelector(state => state.user)

	const [ field, setField ] = useState('')
	const [ fieldError, setFieldError ] = useState('')


	// set user detail in update form 	// await functionality
	useEffect(() => setField(user[edit]), [user, edit, user[edit] ])


	useEffect(() => {
		if(error) dispatch(showAlert({ open: true, severity: 'error', message: error}))
		if(field) setFieldError('')
	}, [field])



	const changeHandler = (evt) => {
		setField(evt.target.value )

		setIsUpdated(false)
		setDisabled(false)
	}

	const resetHandler = () => {
		setField('')
		setIsUpdated(false)
		setDisabled(false)
	}
	const closeHandler = () => {
		setOpen(false)
		resetHandler()
	}
	const submitHandler = (evt) => {
		evt.preventDefault()

		if(!field.trim()) return setFieldError(`${field} field is empty.`)

		setIsUpdated(true)
		setDisabled(true)

		setFieldError('')
		dispatch(updateProfile({[edit]: field }))

		// console.log({ [edit]: field })
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

						<Typography variant='h6' sx={{ textTransform: 'uppercase'}} >Update </Typography>
					</Box>

					{isUpdated && <Alert sx={{mb: 2}} severity='success' color='info'>Basic info updated</Alert> }

					<form onSubmit={submitHandler} noValidate >
						<TextField
							label={toCapitalize(edit)}
							placeholder={edit}
							InputLabelProps={{shrink: true}}
							fullWidth
							required
							margin='dense'
							autoComplete='new-password'
							autoFocus
							// type={type}
							name={edit}
							value={field}
							// value={user[field] || field}
							onChange={changeHandler}
							error={!field || !!fieldError}
							helperText={fieldError}

							multiline
							rows={ edit === 'description' ? 3 : 1}
						/>
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


