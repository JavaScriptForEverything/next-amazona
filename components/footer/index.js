import Link from 'next/link'

import FooterSection from './footerSection'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'

import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/FacebookRounded'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import DownloadIcon from '@mui/icons-material/Download'

const siteLinks = [
	{ label: 'home', path: '/' },
	{ label: 'about', path: '/about' },
	{ label: 'contact Us', path: '/contact' },
	{ label: 'profile', path: '/user/profile' },
	{ label: 'dashboard', path: '/user/dashboard' },
	{ label: 'reset-password', path: '/user/reset-password' },
	{ label: 'update-my-password', path: '/user/update-my-password' },
	{ label: 'cart', path: '/cart' },
	{ label: 'shipping', path: '/shipping' },
	{ label: 'login', path: '/login' },
]

const socialMedia = [
	{ icon: <GitHubIcon fontSize='large' />, path: 'https://github.com/JavaScriptForEverything' },
	{ icon: <LinkedInIcon fontSize='large' />, path: 'https://www.linkedin.com/in/javascriptforeverything/' },
	{ icon: <TwitterIcon fontSize='large' />, path: 'https://twitter.com/JSforEverything' },
	{ icon: <FacebookIcon fontSize='large' />, path: 'https://www.facebook.com/JavaScriptForEverything' },
]


const Footer = () => {

	return (
		<Box disableGutters
			sx={{
				backgroundColor: '#282828',
				color: '#f9f9f9d0'
			}}
		>
		<Container>

			<Grid container spacing={3} >
				<Grid item xs={12} sm={6} md={3}>
					<FooterSection dividerColor='white' title='Site Links'>
						<Grid container spacing={2}>
							{siteLinks.map(({label, path}, key) => (
							<Grid key={key} item xs={6}>
								<Link href={path} passHref>
									<MuiLink fontSize='small' underline='none' sx={{whiteSpace: 'nowrap'}} >{label}</MuiLink>
								</Link>
							</Grid>
							))}
						</Grid>
					</FooterSection>
				</Grid>

				<Grid item xs={12} sm={6} md={3}>
					<FooterSection dividerColor='white' title='Contact'>
						<Typography fontSize='small' paragraph>
							Anyone can contact up with given email or any <em>social media</em> links
						</Typography>

						<Typography fontSize='small'>
							<Link href='mailto:javascriptforeverything@gmail.com' passHref>
								<MuiLink underline='none'>Email: JavaScriptForEverything@gmail.com</MuiLink>
							</Link>
						</Typography>
					</FooterSection>
				</Grid>

				<Grid item xs={12} sm={6} md={3}>
					<FooterSection dividerColor='white' title='About Us'>
						<Typography fontSize='small' paragraph>
							Currently I am working alone and trying to create a group, more details in my CV.
						</Typography>
							<Button
								startIcon={<DownloadIcon />}
								component='a' href='/resume.pdf' download='resume.pdf'
							>Download Resume</Button>
					</FooterSection>
				</Grid>

				<Grid item xs={12} sm={6} md={3}>
					<FooterSection dividerColor='white' title='Social Media'>

						<Box sx={{display: 'flex', gap: 2 }}>
							{socialMedia.map(({ icon, path}, key) => <Link key={key} href={path} passHref>
								<MuiLink target='_blank' color='inherit' >{icon}</MuiLink>
							</Link>
							)}
						</Box>

						<Typography fontSize='small'>
							Copyright &copy; 2019 - {new Date().getFullYear()} JavaScriptForEverything
						</Typography>
					</FooterSection>
				</Grid>
			</Grid>
		</Container>

			<Typography component='footer' align='center' sx={{
				backgroundColor: '#18181888',
				mt: 3,
				py: 1
			}}> All Right Reserved &copy;HashTAG </Typography>
		</Box>
	)
}
export default Footer
