// import { useEffect } from 'react'
import Link from 'next/link'
// import Error from 'next/error'
// import { useDispatch, useSelector } from 'react-redux'


import Layout from '../layout'

import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'


import StyledAvatar from '../components/styledAvatar'


const About = () => {
	const menuHandler = () => {}
	const user = {}

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>

			<IconButton color='inherit' onClick={menuHandler} sx={{ ml: 2 }} >
				<StyledAvatar sx={{ width: '2rem', height: '2rem' }} src={user?.avatar} />
				<Typography sx={{ ml: 1, display: {xs: 'none', sm: 'block'} }}> {user?.username?.split(' ').shift()} </Typography>
			</IconButton>

			<Typography>About Page</Typography>


		</Layout>
	)
}
export default About
