import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import Layout from '../layout'
import Checkout from '../stripe'

const Shipping = () => {
	const router = useRouter()
	const { authenticated } = useSelector(state => state.user)

	/* Dynamic Redirect (Technique)
			. in login.js we push to redirect query if exist else redirect to /home
			. and here we push to login and after login automatically redirect to given route */
	useEffect(() => {
		if(!authenticated) router.push('/login?redirect=/shipping')
	}, [])


	return (
		<Layout title='shipping'>
			<Checkout />
		</Layout>
	)
}
export default Shipping