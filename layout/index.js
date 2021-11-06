import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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


const Layout = ({ title, description, children }) => {
	let [ darkMode, setDarkMode ] = useState(false)

	/* NextJS render server-seide rendering first, but we want bellow code only render in client-side
			1. Because, window object only available in Browser in Client-Side, and we use window.localStorage
			2. We parse to json, because, only string value can be store in localStorage.
			3. We can use Redux or useState hook, and in useEffect darkMode is dependencies */
	useEffect(() => {
		darkMode = JSON.parse( localStorage.getItem('darkMode') )
		setDarkMode(darkMode)
	}, [darkMode])

	const changeHandler = (evt, newValue) => {
		setDarkMode(newValue)
		localStorage.setItem('darkMode', JSON.stringify(newValue))
	}




	return (
		<ThemeProvider theme={theme(darkMode)}>
			<Head>
				<title> { title ? title : 'Amazona'} </title>
				{ description && <meta name='description' content={description} />}
			</Head>

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
							<Button color='inherit' sx={{ textTransform: 'capitalize' }} >Cart</Button>
						</Link>
						<Link href='/login'>
							<Button color='inherit' sx={{ textTransform: 'capitalize' }} >Login</Button>
						</Link>
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
