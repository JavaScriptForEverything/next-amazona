import nookies from 'nookies'

import Layout from '../../layout'

import Typography from '@mui/material/Typography'

const Account = () => {
	return (
		<Layout>
			<Typography>Account Page</Typography>
		</Layout>
	)
}
export default Account


export const getServerSideProps = (ctx) => {
	const { token } = nookies.get(ctx)

	if(!token) return { redirect: { 		// NextJS built-in Redirect features
			destination: '/login',
			parmanent: false
		}
	}

	return { props: {} }
}


