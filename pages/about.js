// import { useEffect } from 'react'
import Link from 'next/link'
// import Error from 'next/error'
// import { useDispatch, useSelector } from 'react-redux'


import Layout from '../layout'

import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'
import Card from '@mui/material/Card'
import AvatarGroup from '@mui/material/AvatarGroup'
import IconButton from '@mui/material/IconButton'


import StyledAvatar from '../components/styledAvatar'


const About = () => {

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>


			<StyledAvatar
				active
				// onClick={() => console.log('clicked')}
				// onClick={'hallow'}
				src='/user.jpg'
				// sx={{ width: '2rem', height: '2rem' }}
			/>


		</Layout>
	)
}
export default About
