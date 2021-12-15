import axios from 'axios'
import absoluteURL from 'next-absolute-url'
import nookies from 'nookies'

import Link from 'next/link'

import { useEffect } from 'react'
import Error from 'next/error'

import Layout from '../layout'
import { wrapper } from '../store'

import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MuiLink from '@mui/material/Link'

const listItems = [
	{ label: 'Profile', path: '/user/profile' },
	{ label: 'Dashboard', path: '/user/account' },
	{ label: 'Reset Password', path: '/user/reset-password' },
	{ label: 'Update Password', path: '/user/update-my-password' },
	{ label: 'Cart', path: '/cart' },
	{ label: 'Shipping', path: '/shipping' },
	{ label: 'Login or Signup', path: '/login' },
]

const Contact = ({ user }) => {


	return (
		<Layout title='Contact Page'>
			<Typography variant='h6'>This is Contact page</Typography>
			<List>
			{ listItems.map(({label, path}, key) => (
				<ListItem dense key={key}>
					<Link href={path} passHref><MuiLink>{label}</MuiLink></Link>
				</ListItem>
			))}

			</List>

			<pre>
				{ user && JSON.stringify(user, null, 2)}
			</pre>

		</Layout>
	)
}
export default Contact



// export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
// 	const { token } = ctx.req.cookies
// 	if(!token) return

// 	console.log({ token })
// 	// console.log({ state: store.getState() })
// })


export const getServerSideProps = async (ctx) => {
	const { token } = ctx.req.cookies
	// const token  = ctx.req.headers.cookie
	// nookies.destroy(ctx)
	// console.log({ token })

	return { props: {}}
}


