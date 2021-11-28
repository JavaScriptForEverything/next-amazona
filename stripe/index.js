import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../store/dialogReducer'

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



const labels = ['Shipping', 'Details', 'Payment']


const Checkout = () => {
	const [ activeStep, setActiveStep ] = useState(0)
	const [ disabled, setDisabled ] = useState(false)
	const [ loading, setLoading ] = useState(false)
	const dispatch = useDispatch()
	// const { shippingObj, detailsArr, paymentObj } = useSelector(state => state.stripe )
	const { paymentObj: { currency } } = useSelector(state => state.payment )
	const { totalPrice } = useSelector(state => state.dialog )

	const stripe = useStripe()
	const elements = useElements()


	const nextHandler = () => { 				// this function only used on form submit not on button click
		if( activeStep >= 3 ) return
		setActiveStep(step => step + 1)
	}
	const backHandler = () => {
		if(activeStep <= 0) return
		setActiveStep(step => step - 1)
		setLoading(false) 								// To reset to default
		setDisabled(false) 								// To reset to default
	}

	const handleFormSubmit = async (evt) => {
		evt.preventDefault()

		// Only handle payment form here else  elements.getElement(CardNumberElement) return null
		if( activeStep !== 2 ) return nextHandler()

		setLoading(true)
		setDisabled(true)




		// // /* Remove to complete payment
		// setActiveStep(step => step + 1)
		// console.log(currency, totalPrice)
		// setTimeout(() => {
		// 	setLoading(false)
		// 	setDisabled(false)

		// }, 1000)
		// return
		// // Remove to complete payment 	*/




		if(!stripe || !elements) return

try {
		const { data: { clientSecret } } = await axios.post('/api/checkout', {
			amount: totalPrice,
			currency
		})

		const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardNumberElement)
			}
		})

    if(error) {
			setLoading(false)
    	console.log(error)
    	return
    }

    // on success
		dispatch(showAlert({open: true, severity: 'success', message: 'Payment Success'}))
  	console.log(paymentIntent)

		setActiveStep(step => step + 1) 		// push on success step
		setLoading(false)
		setDisabled(false)


} catch(error) {
	console.log(error)
	setLoading(false)
}

	} // End of submitForm


	return (
		<Box sx={{ my: 3 }} >
			<Container maxWidth='xs' >
				<Paper sx={{ px: 2, py: 3 }} >
					<Typography variant='h4' align='center' > Checkout </Typography>
					<Stepper activeStep={activeStep} sx={{ my: 4 }} >
						{labels.map(label => (
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
							{ activeStep ? <Button onClick={backHandler}>Back</Button> : '' }
							<Button type='submit' variant='outlined'
								disabled={disabled || !stripe || !elements}
							>
							{ (activeStep === 2 ) ? 'Pay' :
								(activeStep === 3) ? (
									loading ?	<CircularProgress size={24} /> : 'Success'
								) : 'Next'
							}
							</Button>



						</Box>
					</form>

				</Paper>
			</Container>
		</Box>
	)
}
export default Checkout
