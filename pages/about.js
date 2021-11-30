import Link from 'next/link'
import Error from 'next/error'

import Layout from '../layout'

import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'

const About = () => {
	if(false) return <Error statusCode={400} />

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>

			<Link href='/user/profile' passHref >
				<MuiLink>profile</MuiLink>
			</Link>
		</Layout>
	)
}
export default About
