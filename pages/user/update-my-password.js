import nookies from 'nookies'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../../store/dialogReducer'
import { updateMyPassword } from '../../store/userReducer'
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

import LockIcon from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'




const UserPasswordUpdate = ({ history }) => {
	const { token } = nookies.get(null)

	const router = useRouter()
	const dispatch = useDispatch()

	const [ value, setValue ] = useState(0) 						// to set Tabs
	const [ currentPasswordVisibility, setCurrentPasswordVisibility ] = useState(1)
	const [ newPasswordVisibility, setNewPasswordVisibility ] = useState(1)
	const [ confirmPasswordVisibility, setConfirmPasswordVisibility ] = useState(1)

	const [ updateFields, setUpdateFields ] = useState({currentPassword: '', password: '', confirmPassword: ''})
	const [ updateFieldErrors, setUpdateFieldErrors ] = useState({})

	const { error, loading } = useSelector(state => state.user)

	useEffect(() => error && dispatch(showAlert({open: true, severity: 'error', message: error})), [error])


	const tabHandler = (evt, newValue) => setValue(newValue)
	const updatePasswordHandler = async (evt) => {
		evt.preventDefault()

		const isValidated = formValidator(updateFields, setUpdateFieldErrors)
		if(!isValidated) return

		// console.log(updateFields)
		dispatch(updateMyPassword(updateFields, token))

		// redirect to
		router.push('/login')
	}





	return (
		<Layout title={'Update Password Page'}>
			<Box sx={{ mt: 3, p: 3 }} >
				<Container maxWidth='xs' component='main'  >
					<Paper sx={{ p: 2 }} >
						<Tabs value={value} onChange={tabHandler} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }} >
							<Tab label='Update Password'  />
						</Tabs>

						{/*-----[ Update Password Form ]-----*/}
						<TabPanel value={value} index={0} >
							<form noValidate onSubmit={updatePasswordHandler}>
								<TextField
									// sx={{ mt: 2 }}
									label='Current Password'
									placeholder='Current Password'
									type={!currentPasswordVisibility ? 'text' : 'password'}
									fullWidth
									required
									InputProps={{
										startAdornment: <InputAdornment position='start'> <LockIcon /> </InputAdornment>,
										endAdornment: <InputAdornment position='end'>
											<IconButton onClick={() => setCurrentPasswordVisibility(!currentPasswordVisibility)} >
												{ currentPasswordVisibility ? <Visibility /> : <VisibilityOff />  }
											</IconButton>
										</InputAdornment>
									}}
									value={updateFields.currentPassword}
									onChange={(evt) => setUpdateFields({...updateFields, currentPassword: evt.target.value})}
									error={!updateFields.currentPassword || !!updateFieldErrors.currentPassword}
									helperText={updateFieldErrors.currentPassword}
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
export default UserPasswordUpdate

export const getServerSideProps = (ctx) => {
	const { token } = ctx.req.cookies

	if(!token) return { redirect : {
		destination: '/login',
		parmanent: false
	}}

	return { props: {}}
}
