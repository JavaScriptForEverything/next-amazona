import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, logoutMe } from '../store/userReducer'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Snackbar from './snackbar'

import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import LinearProgressBar from './linearProgressBar'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import NoSsr from '@mui/material/NoSsr'
import MuiLink from '@mui/material/Link'
import Divider from '@mui/material/Divider'

import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'


import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LogoutIcon from '@mui/icons-material/Logout'

const menuItems = [
	// { label: 'Profile', path: '/user/profile' },
	{ label: 'Dashboard', path: '/user/account', icon: <DashboardIcon /> },
	{ label: 'Logout', path: '/user/logout', icon: <LogoutIcon /> },
]

const Layout = ({ title, description, children }) => {
	const dispatch = useDispatch()
	const router = useRouter()
	const { redirect } = router.query

	const [ menuOpen, setMenuOpen ] = useState(false)
	const [ anchorEl, setAnchorEl ] = useState(null)

	let { cartItems } = useSelector(state => state.dialog)
	let [ darkMode, setDarkMode ] = useState(false)
	let [ badge, setBadge ] = useState(0)

	const { token, authenticated, user } = useSelector(state => state.user)
	// console.log(user)

	useEffect(() => {
		authenticated && dispatch(getUser(token))
	}, [dispatch, token])


	/* NextJS render server-seide rendering first, but we want bellow code only render in client-side
			1. Because, window object only available in Browser in Client-Side, and we use window.localStorage
			2. We parse to json, because, only string value can be store in localStorage.
			3. We can use Redux or useState hook, and in useEffect darkMode is dependencies */
	useEffect(() => {
		darkMode = JSON.parse( localStorage.getItem('darkMode') ) || false
		setDarkMode(darkMode)

		setBadge(cartItems.length)
	}, [darkMode, cartItems])

	const changeHandler = (evt, newValue) => {
		setDarkMode(newValue)
		localStorage.setItem('darkMode', JSON.stringify(newValue))
	}

	const menuCloseHandler = () => setMenuOpen(false)
	const menuHandler = (evt) => {
		setAnchorEl(evt.currentTarget)
		setMenuOpen(true)
	}
	const menuItemHandler = (evt, {label, path}) => {
		menuCloseHandler()

		if(label !== 'Logout') return router.push(path)

		dispatch(logoutMe())
		router.push( redirect || '/login')
	}




	return (
		<ThemeProvider theme={theme(darkMode)}>
			<Head>
				<title> { title ? title : 'Amazona'} </title>
				{ description && <meta name='description' content={description} />}
			</Head>


			{/*------[ Show Alert ]--------*/}
			<Snackbar />

			<CssBaseline />
			<AppBar position='relative'>
				<Toolbar>
					{/*------[ Left side ]--------*/}
					<Link href='/' passHref>
						<Button color='inherit' sx={{ textTransform: 'capitalize' }} >Amazona</Button>
					</Link>
					<Link href='/about' passHref>
						<Button color='inherit' sx={{ textTransform: 'capitalize' }} >About</Button>
					</Link>

					{/*------[ Right side ]--------*/}
					<Box sx={{ marginLeft: 'auto' }}>
						<Switch color='secondary' checked={darkMode} onChange={changeHandler} />

						<Link href='/cart'>
							<IconButton color='inherit' >
								<Badge badgeContent={badge} color='error' >
									<ShoppingCartIcon />
								</Badge>
							</IconButton>
						</Link>


						<NoSsr>
						{ authenticated ? (
							<IconButton color='inherit' onClick={menuHandler} sx={{ ml: 2 }} >
								<Avatar sx={{ width: '2rem', height: '2rem' }} src={user?.avatar} />
								<Typography sx={{ ml: 1, display: {xs: 'none', sm: 'block'} }}>
									{user?.username.split(' ').shift()} </Typography>
								</IconButton>
						) : (
							<Link href='/login'>
								<Button color='inherit' sx={{ textTransform: 'capitalize' }} >Login</Button>
							</Link>
						)}
						</NoSsr>
						<Menu
							open={menuOpen}
							anchorEl={anchorEl}
							onClose={menuCloseHandler}
							PaperProps={{
								style: {
									width: 200,
								}
							}}
						>
							<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, my: 2 }} >
								<Avatar
									src={user?.avatar}
									alt={user?.avatar}
								/>
								<Typography sx={{textTransform: 'capitalize'}} >{user?.username}</Typography>
								<Link href='/user/profile' passHref><MuiLink>My Profile</MuiLink></Link>
							</Box>
							{menuItems.map((item, key) => [
								key === 0 && <Divider />,
								<MenuItem
									key={item.label}
									onClick={(evt) => menuItemHandler(evt, item)}
									divider={item.label !== 'Logout'}
									dense
									>
									<ListItemIcon>
										{item.icon}
									</ListItemIcon>
									<ListItemText>
									{item.label}
									</ListItemText>
								</MenuItem>
							])}
						</Menu>

					</Box>
				</Toolbar>
			</AppBar>
			<Box style={{ position: 'sticky', top: 0, left: 0, zIndex: 1, width: '100%'}} >
				<LinearProgressBar />
			</Box>



			<Container sx={{ minHeight: '80vh' }} > { children } </Container>
			<Typography component='footer' align='center' > All Right Reserved amazona </Typography>

		</ThemeProvider>
	)
}
export default Layout
