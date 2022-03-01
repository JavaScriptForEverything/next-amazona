import Link from 'next/link'

import FooterSection from './footerSection'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/FacebookRounded'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
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
	{ label: 'smartr', path: 'https://www.smartr.me/public/profiles/riajul.islam' },
]

const apiLinks = [
	{ label: 'products', path: '/api/products' },
	{ label: 'users', path: '/api/users' },
	{ label: 'comments', path: '/api/comments' },
	{ label: 'documents', path: '/api/documents' },
]

const docLinks = [
	{ label: 'site doc', path: '/doc/site' },
	{ label: 'api doc', path: '/doc/api' },
	{ label: 'others', 	path: '/doc/other' },
]




const socialMedia = [
	{ icon: <GitHubIcon fontSize='large' />, path: 'https://github.com/JavaScriptForEverything' },
	{ icon: <LinkedInIcon fontSize='large' />, path: 'https://www.linkedin.com/in/javascriptforeverything/' },
	{ icon: <TwitterIcon fontSize='large' />, path: 'https://twitter.com/JSforEverything' },
	{ icon: <FacebookIcon fontSize='large' />, path: 'https://www.facebook.com/JavaScriptForEverything' },
	{ icon: <InstagramIcon fontSize='large' />, path: 'https://www.instagram.com/javascriptforeverything/' },
]

const DocComponent = () => (
	<>
		<Typography paragraph sx={{ fontWeight: 'bold' }}>Docs</Typography>
		<Box sx={{display: 'grid', gridGap: 8}} >
		{docLinks.map(({label, path}, key) => (
			<Link key={key} href={path} passHref>
				<MuiLink underline='none'sx={{color: '#ffffffaa', fontSize: '.9rem', whiteSpace: 'nowrap'}} >{label}</MuiLink>
			</Link>
		))}
		</Box>
	</>
)

const Footer = ({ ...params }) => {

	return (
		<Box {...params}>
			<Container component='section' >
				<Grid container spacing={3} >

					{/*----------[ footer: HashTag Section ]----------*/}
					<Grid component='article' item xs={12} sm={6} md={3}>
						<FooterSection dividerColor='white' title='HashTag'>
							<Box sx={{
								display: 'grid',
								gridTemplateColumns: '1fr 2fr',
								alignItems: 'center',
								gridGap: 8
							}}>
								<Link href='/about' passHref>
									<MuiLink><img src='/logo.svg' /></MuiLink>
								</Link>

								<Typography align='justify' fontSize='small'>
									HashTag is a fasion ware house, here we sell shirt pant and men ladis and babies
									and all type of ware collection.
								</Typography>
							</Box>

						</FooterSection>
					</Grid>

					{/*----------[ footer: Contact Section ]----------*/}
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

					{/*----------[ footer: About-Us Section ]----------*/}
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

					{/*----------[ footer: Social-Media Section ]----------*/}
					<Grid item xs={12} sm={6} md={3}>
						<FooterSection dividerColor='white' title='Social Media'>

							<Box sx={{display: 'flex', gap: 2, my: 2 }}>
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

				<Divider sx={{mt: 3, mb: 1, borderBottom: '1px solid gray'}} />


				{/*----------[ footer: Link Section ]----------*/}
				<Box sx={{
					mt: 2,
					display: 'grid',
					gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
					gridGap: 16,
				}}>
					<Box>
						<Typography paragraph sx={{ fontWeight: 'bold' }}>HashTag</Typography>
						<Box sx={{display: 'grid', gridGap: 8}} >
						{siteLinks.map(({label, path}, key) => (
							<Link key={key} href={path} passHref>
								<MuiLink underline='none'sx={{color: '#ffffffaa', fontSize: '.9rem', whiteSpace: 'nowrap'}} >{label}</MuiLink>
							</Link>
						))}
						</Box>
					</Box>

					<Box>
						<Typography paragraph sx={{ fontWeight: 'bold' }}>API</Typography>
						<Box sx={{display: 'grid', gridGap: 8}} >
						{apiLinks.map(({label, path}, key) => (
							<Link key={key} href={path} passHref>
								<MuiLink underline='none'sx={{color: '#ffffffaa', fontSize: '.9rem', whiteSpace: 'nowrap'}} >{label}</MuiLink>
							</Link>
						))}
						</Box>

						{/*----------[ Docs: show here in xs ]----------*/}
						<Box sx={{ display: { xs: 'block', sm: 'none'}, mt: 5 }}> <DocComponent /> </Box>
					</Box>

						{/*----------[ Docs: hide in xs and show here in sm ]----------*/}
					<Box sx={{ display: { xs: 'none', sm: 'block'} }}> <DocComponent /> </Box>
				</Box>
			</Container>

			{/*----------[ footer: CopyRight Section ]----------*/}
			<Typography component='section' align='center' sx={{
				backgroundColor: '#18181888',
				mt: 3,
				py: 1
			}}> All Right Reserved &copy;HashTAG </Typography>
		</Box>
	)
}
export default Footer
