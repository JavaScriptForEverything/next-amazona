import { verify } from 'jsonwebtoken'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { wrapper } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../store/dialogReducer'
import { authenticateUser, getUser, getUserById, loginUser } from '../store/userReducer'
import { formValidator, getKeysOfArrayObject, TabPanel } from '../util'

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


import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'


const inputItems = [
	{ 
		label: 'Email Address', 
		placeholder: 'abc@gmail.com',
		type: 'email',
		name: 'email',
		adornment: {
			start: <EmailIcon />,
			end: []
		}
	},
	{ 
		label: 'Password', 
		placeholder: '********',
		type: 'password',
		name: 'password',
		adornment: {
			start: <LockIcon />,
			end: [<Visibility />, <VisibilityOff />],
		}
	}
]
const arrayObject = getKeysOfArrayObject(inputItems)
const redirectTo = '/user/profile'

const Login = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	const [ fields, setFields ] = useState({ ...arrayObject })
	const [ fieldsError, setFieldsError ] = useState({})

	const { error, loading, status, authenticated } = useSelector(state => state.user)


	// show error after client-side redirect
	useEffect(() => {
		if(error) return dispatch( showAlert({ open: true, severity: 'error', message: error, duration: 8000 }) )

		// client-Side redirect: after login success
		if( status == 'success') {
			dispatch( showAlert({ open: true, severity: 'success', message: 'Login is success' }) )
			dispatch(authenticateUser())
			router.push(redirectTo) 										
			return 
		}

	}, [error, status ])


	const isOn = (name) => `is_${name}_on`   		// => just use name, instead of magic value
	const adornmentClickHandler = (name) => () => {
		setFields({ ...fields, [isOn(name)]: !fields[isOn(name)] })
	}
	const changeHandler = (name) => (evt) => setFields({...fields, [name]: evt.target.value})


	const submitHandler = async (evt) => {
		evt.preventDefault()

		const isValidated = formValidator(fields, setFieldsError)
		if(!isValidated) return 		// client-side validation

		// 2. Send data to database
		dispatch(loginUser(fields))

		// 3. Redirect to login: We will do that by server-side rendering: by getServerSideProps
	}

	return (
		<Layout title='Login Page' >

			<Box sx={{ mt: 3, p: 3 }} >
				{/*-----[ start coding bellow here ]------*/}

				<Container component='section' maxWidth='xs' >
					<Paper sx={{ p: 2 }}>
							<Tabs value={0} onChange={f =>f} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }} >
								<Tab label='Login' />
							</Tabs>

							<TabPanel value={1} index={1} >

								<form noValidate onSubmit={submitHandler} >
									{inputItems.map( (item, index ) => (
										<TextField key={item.name}
											sx={ index === 0 ? {} : { mt: 2 }}
											label={item.label}
											placeholder={item.placeholder}
											type={fields[isOn(item.name)] ? 'text' : item.type}
											fullWidth
											required
											// autoFocus={ index === 0 }
											InputProps={{
												startAdornment: <InputAdornment position='start'> {item.adornment.start} </InputAdornment>,
												endAdornment: item.adornment.end.length ?  (
												<InputAdornment position='end'>
													<IconButton onClick={adornmentClickHandler(item.name)} >
														{ fields[isOn(item.name)] 
															? item.adornment.end[1] 
															: item.adornment.end[0] } 
													</IconButton>
												</InputAdornment>
												) : ''
											}}
											value={fields[item.name]}
											onChange={changeHandler(item.name)}
											error={!fields[item.name] || !!fieldsError[item.name]}
											helperText={fieldsError[item.name]}
										/>
									))}

									<Box sx={{
										display: 'flex',
										justifyContent: 'flex-end',
										mt: 2
									}}>
										<Link href='/user/reset-password' passHref >
											<MuiLink variant='caption' color='secondary'>forgot password ?</MuiLink>
										</Link>
									</Box>

									<Button
										sx={{ mt: 3, mb: 2 }}
										variant='contained'
										color='primary'
										type='submit'
										fullWidth
									>{loading ? <CircularProgress size={24} style={{color: 'white'}} /> : 'Login'}</Button>
								</form>

								<Box sx={{
									display: 'flex',
									justifyContent: 'center',
									margin: 1
								}}>
									<Typography variant='body2'>not registered ? </Typography>
									<Link href='/signup' passHref>
										<MuiLink variant='body2' sx={{ marginLeft: 1 }}> signup </MuiLink>
									</Link>
								</Box>

							</TabPanel>

					</Paper>
				</Container>
			</Box>
		</Layout>
	)
}
export default Login



export const getServerSideProps = (ctx) => {
	const { token } = ctx.req.cookies || {}
	if( !token )	return { props: {} }

	try {
		const TOKEN_SECRET = process.env.TOKEN_SECRET
		const { _id, iat } = verify(token, TOKEN_SECRET)

		return { redirect: {
			destination: '/profile',
			parmanent: false
		}}

	} catch (err) {
		console.log(err.message)
	}

	return { props: {} }
}
