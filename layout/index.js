import Head from 'next/head'
import Link from 'next/link'

import theme from './theme'
import { ThemeProvider } from '@mui/material/styles'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'


const Layout = ({ title, description, children }) => {
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title> { title ? title : 'Amazona'} </title>
				{ description && <meta name='description' content={description} />}
			</Head>


			<CssBaseline />
			<AppBar position='relative'>
				<Toolbar>
					{/*------[ Right side ]--------*/}
					<Link href='/' passHref>
						<Button color='inherit' sx={{ textTransform: 'capitalize' }} >Amazona</Button>
					</Link>
					<Link href='/about' passHref>
						<Button color='inherit' sx={{ textTransform: 'capitalize' }} >About</Button>
					</Link>

					{/*------[ Right side ]--------*/}
					<Box sx={{ marginLeft: 'auto' }}>
						<Link href='/cart'>
							<Button color='inherit' sx={{ textTransform: 'capitalize' }} >Cart</Button>
						</Link>
						<Link href='/login'>
							<Button color='inherit' sx={{ textTransform: 'capitalize' }} >Login</Button>
						</Link>
					</Box>
				</Toolbar>
			</AppBar>

			<Container sx={{ minHeight: '80vh' }} > { children } </Container>
			<Typography component='footer' align='center' > All Right Reserved amazona </Typography>

		</ThemeProvider>
	)
}
export default Layout
