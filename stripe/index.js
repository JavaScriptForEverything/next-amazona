import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert, removeCartItems } from '../store/dialogReducer'

import StepContent from './stepContent'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import CircularProgress from '@mui/material/CircularProgress'


import { CardNumberElement, useStripe, useElements } from '@stripe/react-stripe-js'


const Checkout = () => {
	const [ activeStep, setActiveStep ] = useState(0)
	const [ loading, setLoading ] = useState(false)
	const dispatch = useDispatch()
	const router = useRouter()

	const stripe = useStripe()
	const elements = useElements()

	const { shippingObj, paymentObj: { currency } } = useSelector(state => state.payment )
	const { totalPrice } = useSelector(state => state.dialog )
	const { token } = useSelector(state => state.user )


	const nextHandler = () => { 				// this function only used on form submit not on button click
		if( activeStep >= 3 ) return
		setActiveStep(step => step + 1)
	}
	const backHandler = () => {
		if(activeStep === 3 ) return router.push('/')
		if(activeStep <= 0) return
		setActiveStep(step => step - 1)
		setLoading(false) 								// To reset to default
	}

	const handleFormSubmit = async (evt) => {
		evt.preventDefault()

		// Only handle payment form here else  elements.getElement(CardNumberElement) return null
		if( activeStep !== 2 ) return nextHandler()
		if(!stripe || !elements) return
		setLoading(true)

		try {
			const { data: { clientSecret, payment } } = await axios.post('/api/checkout', {
				payment: { amount: totalPrice, currency },
				shipping: shippingObj
			}, {
				headers: { 'Authorization': `Bearer ${token}`}
			})

			const { error, paymentIntent: { status } } = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardNumberElement)
				}
			})

	    if(error) {
				setLoading(false)
	    	console.log(error)
				dispatch(showAlert({open: true, severity: 'error', message: error.message}))
	    	return
	    }

	    // on success
			dispatch(showAlert({open: true, severity: 'success', message: 'Payment Success'}))
			setActiveStep(step => step + 1) 		// push on success step(page)
			setLoading(false)

			// Remove cart items from localStorage after payment complete by Instant Update
			dispatch(removeCartItems())

			// we can pass this product success on database to save it
	  	console.log({ payment, clientSecret, status })

		} catch(error) {
			console.log(error)
			setLoading(false)
			dispatch(showAlert({open: true, severity: 'error', message: error.message}))
		}

	} // End of submitForm


	return (
		<Box sx={{ my: 3 }} >
			<Container maxWidth='xs' >
				<Paper sx={{ px: 2, py: 3 }} >
					<Typography variant='h4' align='center' > Checkout </Typography>
					<Stepper activeStep={activeStep} sx={{ my: 4 }} >
						{['Shipping', 'Details', 'Payment'].map(label => (
							<Step key={label} >
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>

					<form noValidate onSubmit={handleFormSubmit}>

						{/*-------[ Form Components ]---------*/}
						<StepContent step={activeStep} loading={loading} />

						{/*-------[ Button Setup ]---------*/}
						<Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 6 }} >
							{ activeStep ? <Button onClick={backHandler}>
								{ activeStep === 3 ? 'Home' : 'Back' }
							</Button> : '' }

							<Button type='submit' variant='outlined' disabled={loading || (activeStep >= 1 && !totalPrice) 	|| (activeStep === 3)} >
								{ activeStep === 2 ? (loading ? <CircularProgress size={24} /> : 'Pay') : (activeStep === 3 ? 'Success' : 'Next') }
							</Button>
						</Box>
					</form>

				</Paper>
			</Container>
		</Box>
	)
}
export default Checkout
