// import { useEffect } from 'react'
import Link from 'next/link'
// import Error from 'next/error'
// import { useDispatch, useSelector } from 'react-redux'


import Layout from '../layout'

import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'

const About = () => {
	// if(false) return <Error statusCode={400} />
	// const dispatch = useDispatch()
	// const { token } = useSelector(state => state.user)

	// useEffect(() => {
	// 	dispatch(getUser2(token))
	// }, [token])

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>

			<Link href='/user/profile' passHref >
				<MuiLink>profile</MuiLink>
			</Link>


			<Card sx={{ display: 'flex', flexDirection: 'column',
			alignItems: 'center', gap: 0.5 }} >
				<Avatar />
				<Typography>Riajul Islam</Typography>
				<Link href='/user/profile' passHref><MuiLink>My Profile</MuiLink></Link>
			</Card>


		</Layout>
	)
}
export default About
