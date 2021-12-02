import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../store/dialogReducer'
import { loginMe, signUpMe } from '../store/userReducer'
import { formValidator, TabPanel } from '../util'

import Layout from '../layout'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import CircularProgress from '@mui/material/CircularProgress'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import MuiLink from '@mui/material/Link'

import LockIcon from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'


const tabItems = ['login', 'sign up']



const Login = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const { redirect } = router.query 		// /login?redirect=something => something

	const [value, setValue] = useState(0)
	const [visibility, setVisibility] = useState(1)
	const [passwordVisibility, setPasswordVisibility] = useState(1)
	const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(1)
	// ---[ Form Validation & Submit ]---
	const [loginFields, setLoginFields] = useState({email: '', password: ''})
	const [loginFieldErrors, setLoginFieldErrors] = useState({})
	const [signupFields, setSignupFields] = useState({username: '', email: '', password: '', confirmPassword: '', avatar: ''})
	const [signupFieldErrors, setSignupFieldErrors] = useState({})

	const { error, authenticated, isSignedUp } = useSelector(state => state.user)

	const tabHandler = (evt, newValue) => setValue(newValue)
	useEffect(() => {
		if(error) return dispatch(showAlert({ open: true, severity: 'error', message: error}))
		if(authenticated) return router.push(redirect || '/user/profile')
		if(isSignedUp) {
			dispatch(showAlert({ open: true, severity: 'success', message: 'Congratulation To join our community !!!'}))
			tabHandler(null, 0) 		// if signup success then redirect to login page
		}
	}, [error, authenticated, isSignedUp])



	// -----------[ Login Form ]-----------
	const handleLoginForm = async (evt) => {
		evt.preventDefault()

		const isValidated = formValidator(loginFields, setLoginFieldErrors)
		if(!isValidated) return

		dispatch(loginMe(loginFields))
	}

	// -----------[ Sign Up Form ]-----------
	const handleSignupForm = async (evt) => {
		evt.preventDefault()

		const isValidated = formValidator(signupFields, setSignupFieldErrors)
		if(!isValidated) return 		// client-side validation

		dispatch(signUpMe(signupFields))

		// 3. Redirect to login (But we already in Login Page, We have to switch to login TAB ?)
		// tabHandler(null, 0) 		// Switch to Login Tab (Do the Redirect Effect)
	}

	return (
		<Layout title={ value ? 'Sign Up Page' : 'Login Page'} >
			<Box sx={{ mt: 3, p: 3 }} >
				{/*-----[ start coding bellow here ]------*/}

				<Container component='section' maxWidth='xs' >
					<Paper sx={{ p: 2 }}>
							<Tabs value={value} onChange={tabHandler} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }} >
								{tabItems.map(item => <Tab key={item} label={item} />)}
							</Tabs>

						{/*----[ value for tabItems[0] === 'login' ]----*/}
							<TabPanel value={value} index={0} >
								<form noValidate onSubmit={handleLoginForm}>
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
										value={loginFields.email}
										onChange={(evt) => setLoginFields({...loginFields, email: evt.target.value})}
										error={!loginFields.email || !!loginFieldErrors.email}
										helperText={loginFieldErrors.email}
									/>
									<TextField
										sx={{ mt: 2 }}
										label='Password'
										placeholder='Password'
										type={!visibility ? 'text' : 'password'}
										fullWidth
										required
										InputProps={{
											startAdornment: <InputAdornment position='start'> <LockIcon /> </InputAdornment>,
											endAdornment: <InputAdornment position='end'>
												<IconButton onClick={() => setVisibility(!visibility)} >
													{ visibility ? <Visibility /> : <VisibilityOff />  }
												</IconButton>
											</InputAdornment>
										}}
										value={loginFields.password}
										onChange={(evt) => setLoginFields({...loginFields, password: evt.target.value})}
										error={!loginFields.password || !!loginFieldErrors.password}
										helperText={loginFieldErrors.password}
									/>

									<Link href='/user/reset-password' passHref>
										<MuiLink>
											<Typography
												sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}
												color='secondary'
												fontSize='small'
											>Forgot Password ?</Typography>
										</MuiLink>
									</Link>

									<Button
										sx={{ mt: 3, mb: 2 }}
										variant='contained'
										color='primary'
										type='submit'
										fullWidth
										required
									>{false ? <CircularProgress size={24} style={{color: 'white'}} /> : 'Login'}</Button>
								</form>
							</TabPanel>

						{/*----[ value for tabItems[1] === 'sign up' ]----*/}
							<TabPanel value={value} index={1} >
								<form noValidate onSubmit={handleSignupForm} >
									<TextField
										// sx={{ mt: 2 }}
										label='Full Name'
										placeholder='Full Name'
										type='text'
										fullWidth
										required
										InputProps={{
											startAdornment: <InputAdornment position='start'><PersonIcon /></InputAdornment>
										}}
										value={signupFields.username}
										onChange={(evt) => setSignupFields({...signupFields, username: evt.target.value})}
										error={!signupFields.username || !!signupFieldErrors.username}
										helperText={signupFieldErrors.username}
									/>
									<TextField
										sx={{ mt: 2 }}
										label='Email Address'
										placeholder='Email Address'
										type='email'
										fullWidth
										required
										InputProps={{
											startAdornment: <InputAdornment position='start'><EmailIcon /></InputAdornment>
										}}
										value={signupFields.email}
										onChange={(evt) => setSignupFields({...signupFields, email: evt.target.value})}
										error={!signupFields.email || !!signupFieldErrors.email}
										helperText={signupFieldErrors.email}
									/>
									<TextField
										sx={{ mt: 2 }}
										label='Password'
										placeholder='Password'
										type={!passwordVisibility ? 'text' : 'password'}
										fullWidth
										required
										InputProps={{
											startAdornment: <InputAdornment position='start'> <LockIcon /> </InputAdornment>,
											endAdornment: <InputAdornment position='end'>
												<IconButton onClick={() => setPasswordVisibility(!passwordVisibility)} >
													{ passwordVisibility ? <Visibility /> : <VisibilityOff />  }
												</IconButton>
											</InputAdornment>
										}}
										value={signupFields.password}
										onChange={(evt) => setSignupFields({...signupFields, password: evt.target.value})}
										error={!signupFields.password || !!signupFieldErrors.password}
										helperText={signupFieldErrors.password}
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
										value={signupFields.confirmPassword}
										onChange={(evt) => setSignupFields({...signupFields, confirmPassword: evt.target.value})}
										error={!signupFields.confirmPassword || !!signupFieldErrors.confirmPassword}
										helperText={signupFieldErrors.confirmPassword}
									/>

									<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3, mt: 2  }} >
										<Avatar src={signupFields.avatar} />
										<TextField
											type = 'file'
											InputProps={{
												inputProps: { accept: 'image/*' }
											}}
											required
											onChange={(evt) => {
												const file = evt.target.files[0]
												const isImage = file.type.match('image/*')

												const reader = new FileReader()
												isImage && reader.readAsDataURL(file)
												reader.onload = () => {
													if(reader.readyState === 2) {
													 setSignupFields({...signupFields, avatar: reader.result})
													}
												}
											}}
											error={!signupFields.avatar || !!signupFieldErrors.avatar}
											helperText={signupFieldErrors.avatar}
										/>
									</Box>

									<Button
										sx={{ mt: 3, mb: 2 }}
										variant='contained'
										color='primary'
										type='submit'
										fullWidth
									>{false ? <CircularProgress size={24} style={{color: 'white'}} /> : 'Sign Up'}</Button>
								</form>
							</TabPanel>

					</Paper>
				</Container>
			</Box>
		</Layout>
	)
}
export default Login


