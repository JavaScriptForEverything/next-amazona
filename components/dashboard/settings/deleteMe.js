import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { arrayObjectCreator, getKeysOfArrayObject, formValidator } from '../../../util'
import { deleteUser } from '../../../store/userReducer'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

import ClearIcon from '@mui/icons-material/Clear'

const inputItems = [
	arrayObjectCreator('Email Address', 'email'),
	arrayObjectCreator('Password', 'password', 'password')
]


const DeleteMe = ({ onClick=f=>f }) => {
	const router = useRouter()
	const dispatch = useDispatch()
	const [ open, setOpen ] = useState(false)

	const [ fields, setFields ] = useState(getKeysOfArrayObject(inputItems))
	const [ fieldsError, setFieldsError ] = useState(getKeysOfArrayObject(inputItems))

	const { error, loading, token } = useSelector(state => state.user)

	useEffect(() => {
		if(!token) router.push('/login')
	}, [token])

	const closeHandler = () => {
		setOpen(false)
		setFieldsError(getKeysOfArrayObject(inputItems))
	}

	const dialogOpenHandler = (evt) => {
		setOpen(true)
		// onClick(evt)
	}

	const changeHandler = (evt, name) => {
		setFields({...fields, [name]: evt.target.value})
	}
	const submitHandler = (evt) => {
		evt.preventDefault()

		if(!formValidator(fields, setFieldsError)) return

		// console.log(fields)
		dispatch(deleteUser(token, fields))
	}

	return (
		<>
			<Typography variant='h6' color='error' sx={{ py: 1 }}> Delete User </Typography>

			<Button
				color='error'
				variant='outlined'
				onClick={dialogOpenHandler}
			>Delete Your Account</Button>

			<Dialog
				open={open}
				onClose={closeHandler}
				maxWidth='xs'
				// hideBackdrop
			>
				<DialogTitle component='section' sx={{
					display: 'flex',
					gap: 2,
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
					<Typography variant='h6'> Want to delete your account ? </Typography>
					<IconButton onClick={closeHandler}><ClearIcon /></IconButton>
				</DialogTitle>

				<Alert severity='warning' color='error' sx={{ mb: 2 }} >
					This is extreamly importent
				</Alert>

				<DialogContent>
					<Typography paragraph variant='body2' color='textSecondary'>
				 		You will no longer be billed, and after 90 days your username will be available to anyone on GitHub.
					</Typography>

					<Typography paragraph variant='body2' color='textSecondary'>
						For more help, read our article "Deleting your user account".
					</Typography>

					<form onSubmit={submitHandler} noValidate >

					{inputItems.map(({label, name, type}, key) => <TextField key={key}
						label={label}
						placeholder={label}
						required
						fullWidth
						margin='dense'
						InputLabelProps={{ shrink: true }}

						type={type}
						value={fields[name]}
						onChange={(evt) => changeHandler(evt, name)}
						error={!!fields[name] || !!fieldsError[name]}
						helperText={fieldsError[name]}
					/>)}

						<Button
							sx={{my: 1}}
							fullWidth
							variant='contained'
							type='submit'
						>
						{loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Delete My Account'}
						</Button>
					</form>
				</DialogContent>
			</Dialog>

		</>
	)
}
export default DeleteMe
