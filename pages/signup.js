import nookies from 'nookies'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../store/dialogReducer'
import { loginMe, signUpMe } from '../store/userReducer'
import { formValidator, getKeysOfArrayObject, readAsDataURL, TabPanel } from '../util'

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
		label: 'Full Name', 
		placeholder: 'Iiajul Islam',
		type: 'text',
		name: 'name',
		adornment: {
			start: <PersonIcon />,
			end: []
		}
	},
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
	},
	{ 
		label: 'Confirm Password', 
		placeholder: '********',
		type: 'password',
		name: 'confirmPassword',
		adornment: {
			start: <LockIcon />,
			end: [<Visibility />, <VisibilityOff />]
		}
	}
]
const arrayObject = getKeysOfArrayObject(inputItems)

const Signup = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const { redirect } = router.query 		// /login?redirect=something => something

	const [ avatar, setAvatar ] = useState({})
	const [ fields, setFields ] = useState({ ...arrayObject })
	const [ fieldsError, setFieldsError ] = useState({})

	const { error, loading, authenticated, isSignedUp, user } = useSelector(state => state.user)

	const isOn = (name) => `is_${name}_on`   		// => just use name, instead of magic value
	const adornmentClickHandler = (name) => () => {
		setFields({ ...fields, [isOn(name)]: !fields[isOn(name)] })
	}
	const changeHandler = (name) => (evt) => setFields({...fields, [name]: evt.target.value})
	const imageChangeHandler = (evt) => {
		const { error } = readAsDataURL(evt.target.files[0], setAvatar)
		setFieldsError({ ...fieldsError, avatar: error })
	}


	const handleSignupForm = async (evt) => {
		evt.preventDefault()


		const isValidated = formValidator(fields, setFieldsError)
		// console.log( fieldsError )
		if(!isValidated) return 		// client-side validation
		if(!avatar) setFieldsError({ avatar: 'avatar field is empty' })

		// return console.log({ ...fields, avatar })
		dispatch(signUpMe({ ...fields, avatar }))

		// 3. Redirect to login (But we already in Login Page, We have to switch to login TAB ?)
		// tabHandler(null, 0) 		// Switch to Login Tab (Do the Redirect Effect)
	}

	return (
		<Layout title='Sign Up Page' >
			<Box sx={{ mt: 3, p: 3 }} >
				{/*-----[ start coding bellow here ]------*/}

				<Container component='section' maxWidth='xs' >
					<Paper sx={{ p: 2 }}>
							<Tabs value={0} onChange={f =>f} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }} >
								<Tab label='Sign up' />
							</Tabs>

							<TabPanel value={1} index={1} >

								<form noValidate onSubmit={handleSignupForm} >
									{inputItems.map( (item, index ) => (
										<TextField key={item.name}
											sx={ index === 0 ? {} : { mt: 2 }}
											label={item.label}
											placeholder={item.placeholder}
											// type={item.type}
											type={fields[isOn(item.name)] ? 'text' : item.type}
											fullWidth
											required
											autoFocus={ index === 0 }
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

									<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3, mt: 2  }} >
										<Avatar src={avatar.secure_url} 
											style={{ width: 80, height: 80 }}
										/>
										<TextField
											type = 'file'
											InputProps={{
												inputProps: { accept: 'image/*' }
											}}
											required
											onChange={imageChangeHandler}
											error={!avatar.secure_url || !!fieldsError.avatar }
											helperText={fieldsError.avatar}
										/>
									</Box>

									<Button
										sx={{ mt: 3, mb: 2 }}
										variant='contained'
										color='primary'
										type='submit'
										fullWidth
									>{loading ? <CircularProgress size={24} style={{color: 'white'}} /> : 'Sign Up'}</Button>
								</form>

								<Box sx={{
									display: 'flex',
									justifyContent: 'center',
									margin: 1
								}}>
									<Typography variant='body2'>already a menber ? </Typography>
									<Link href='/login' passHref>
										<MuiLink variant='body2' sx={{ marginLeft: 1 }}> login </MuiLink>
									</Link>
								</Box>

							</TabPanel>

					</Paper>
				</Container>
			</Box>
		</Layout>
	)
}
export default Signup


// login & signup page make server-seide redirect based on cookie
export const getServerSideProps = (ctx) => {
	const token = ctx.req.headers.cookie
	// console.log({ token })

	// if(token) return { redirect: {
	// 	destination: '/user/profile',
	// 	parmanent: false
	// }}

	return { props: {}}
}
