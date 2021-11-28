import dynamic from 'next/dynamic'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import Layout from '../layout'
import Stepper from '../stripe'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)


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
			<Elements stripe={stripePromise}>
				<Stepper />
			</Elements>
		</Layout>
	)
}
// export default Shipping
export default dynamic(() => Promise.resolve(Shipping), { ssr: false })

