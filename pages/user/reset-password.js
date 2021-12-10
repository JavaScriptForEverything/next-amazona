import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../../store/dialogReducer'
import { forgotPassword, resetPassword } from '../../store/userReducer'
import { formValidator } from '../../util'

import Layout from '../../layout'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { TabPanel } from '../../util'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'

import VpnKeyIcon from '@mui/icons-material/VpnKey'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SendIcon from '@mui/icons-material/Send'




const UserPasswordReset = ({ history }) => {
	const router = useRouter()
	const dispatch = useDispatch()

	const [ value, setValue ] = useState(0) 						// to set Tabs
	const [ newPasswordVisibility, setNewPasswordVisibility ] = useState(1)
	const [ confirmPasswordVisibility, setConfirmPasswordVisibility ] = useState(1)

	// user details comes from database first
	const [ fields, setFields ] = useState({email: ''})
	const [ fieldErrors, setFieldErrors ] = useState({})

	const [ updateFields, setUpdateFields ] = useState({token: '', password: '', confirmPassword: ''})
	const [ updateFieldErrors, setUpdateFieldErrors ] = useState({})

	const { loading } = useSelector(state => state.user)



	const tabHandler = (evt, newValue) => setValue(newValue)

	// Update Profile Form Handler
	const forgotPasswordHandler = async (evt) => {
		evt.preventDefault()

		const isValidated = formValidator(fields, setFieldErrors)
		if(!isValidated) return


		// console.log(fields)
		// 1. Check token have or not
		// 2. if not show error alert, else show success alert
		// 3. dispatch forgotPassword to disable loading on success
		await dispatch(forgotPassword(fields)) 	// if not wait, next code execute while take data from redux store

		// redirect to 							// history.push('/user/profile')
		tabHandler(null, 1) 				// to switch to 1st tab (Update Profile)
	}



	const resetPasswordHandler = async (evt) => {
		evt.preventDefault()

		const isValidated = formValidator(updateFields, setUpdateFieldErrors)
		if(!isValidated) return

		await dispatch(resetPassword(updateFields)) 	// wait to complete this step first, before move to next line

		// redirect to
		router.push('/login')
	}





	return (
		<Layout title={ value ? 'Reset Password Page' : 'Forgot Password Page'}>
			<Box sx={{ mt: 3, p: 3 }} >
				<Container maxWidth='xs' component='main'  >
					<Paper sx={{ p: 2 }} >
						<Tabs value={value} onChange={tabHandler} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }} >
							<Tab label='Forgot Password'  />
							<Tab label='Reset Password' />
						</Tabs>

						{/*-----[ Forgot Password Form ]-----*/}
						<TabPanel value={value} index={0} >
							<form noValidate onSubmit={forgotPasswordHandler}>
								<TextField
									// sx={{ mt: 2 }}
									label='Email Address'
									placeholder='Email Address'
									type='email'
									fullWidth
									required
									InputProps={{
										startAdornment: <InputAdornment position='start'><EmailIcon /></InputAdornment>
									}}
									value={fields.email}
									onChange={(evt) => setFields({...fields, email: evt.target.value})}
									error={!fields.email || !!fieldErrors.email}
									helperText={fieldErrors.email}
								/>

								<Button
									sx={{ mt: 3, mb: 2 }}
									variant='contained'
									color='primary'
									type='submit'
									fullWidth
									required
								>{loading ? <CircularProgress size={24} style={{color: 'white'}} /> : (
									<>
										Send Mail <SendIcon fontSize='small' sx={{ ml: 1 }} />
									</>
									)
								}</Button>
							</form>
						</TabPanel>

						{/*-----[ Update Password Form ]-----*/}
						<TabPanel value={value} index={1} >
							<form noValidate onSubmit={resetPasswordHandler}>
								<TextField
									// sx={{ mt: 2 }}
									label='Token'
									placeholder='Token'
									type='text'
									fullWidth
									required
									InputProps={{
										startAdornment: <InputAdornment position='start'> <VpnKeyIcon /> </InputAdornment>,
									}}
									value={updateFields.token}
									onChange={(evt) => setUpdateFields({...updateFields, token: evt.target.value})}
									error={!updateFields.token || !!updateFieldErrors.token}
									helperText={updateFieldErrors.token}
								/>
								<TextField
									sx={{ mt: 2 }}
									label='New Password'
									placeholder='New Password'
									type={!newPasswordVisibility ? 'text' : 'password'}
									fullWidth
									required
									InputProps={{
										startAdornment: <InputAdornment position='start'> <LockIcon /> </InputAdornment>,
										endAdornment: <InputAdornment position='end'>
											<IconButton onClick={() => setNewPasswordVisibility(!newPasswordVisibility)} >
												{ newPasswordVisibility ? <Visibility /> : <VisibilityOff />  }
											</IconButton>
										</InputAdornment>
									}}
									value={updateFields.password}
									onChange={(evt) => setUpdateFields({...updateFields, password: evt.target.value})}
									error={!updateFields.password || !!updateFieldErrors.password}
									helperText={updateFieldErrors.password}
								/>
								<TextField
									sx={{ mt: 2 }}
									label='Confirm Password'
									placeholder='Confirm Password'
									type={!confirmPasswordVisibility ? 'text' : 'password'}
									fullWidth
									required
									InputProps={{
										startAdornment: <InputAdornment position='start'> <LockIcon /> </InputAdornment>,
										endAdornment: <InputAdornment position='end'>
											<IconButton onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)} >
												{ confirmPasswordVisibility ? <Visibility /> : <VisibilityOff />  }
											</IconButton>
										</InputAdornment>
									}}
									value={updateFields.confirmPassword}
									onChange={(evt) => setUpdateFields({...updateFields, confirmPassword: evt.target.value})}
									error={!updateFields.confirmPassword || !!updateFieldErrors.confirmPassword}
									helperText={updateFieldErrors.confirmPassword}
								/>

								<Button
									sx={{ mt: 3, mb: 2 }}
									variant='contained'
									color='primary'
									type='submit'
									fullWidth
									required
								>{loading ? <CircularProgress size={24} style={{color: 'white'}} /> : 'Update'}</Button>
							</form>
						</TabPanel>
					</Paper>
				</Container>
			</Box>
		</Layout>
	)
}
export default UserPasswordReset

export const getServerSideProps = (ctx) => {
	const { token } = ctx.req.cookies

	if(token) return { redirect : {
		destination: '/user/profile',
		parmanent: false
	}}

	return { props: {}}
}
