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


const labels = ['Shipping', 'Details', 'Payment']


const CheckoutForm = () => {
	const [ activeStep, setActiveStep ] = useState(0)
	const [ disabled, setDisabled ] = useState(false)
	const [ loading, setLoading ] = useState(false)
	const dispatch = useDispatch()

	// const { shippingObj, detailsArr, paymentObj } = useSelector(state => state.stripe )


	// --------[ Handle Sub Forms ]--------
	/* We No need this type of dispatch:
			Because we store modified data on every key stock Change, by onChange handler
			by dispatch, It is quite resource consuming task, but it is ok because, this
			process used very less, only when user try to pay.
	*/
	const nextHandler = () => {
		if(activeStep >= labels.length) return
		setActiveStep(step => step + 1)
	}
	const backHandler = () => {
		if(activeStep <= 0) return
		setActiveStep(step => step - 1)
		setLoading(false) 								// To reset to default
		setDisabled(false) 								// To reset to default
	}

	// --------[ Handle Main Forms ]--------
/* We know need to handle any form data in this form, because every form field
	 will modify by redux dispatch on every change, and store that data into localStorage
	 so when we need to send data to backend, we have to just read from localStorage
	 That's it. */
	const handleFormSubmit = (evt) => {
		evt.preventDefault()

		// 1 & 2 perform by click handler and 3 the last one handle by form handler
		if(activeStep === 3) {
			setLoading(true)
			const message = 'Payment Success'

			setTimeout( () => {
				dispatch(showAlert({open: true, severity: 'success', message}))
				setLoading(false)
				setDisabled(true)

				// console.log({shippingObj, detailsArr, paymentObj })

			}, 2000)
		}
	}

	// console.log( activeStep )

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
							<Button onClick={nextHandler} type='submit' variant='outlined'
								disabled={disabled}
							>
							{ (activeStep === labels.length - 1) ? 'Pay' :
								(activeStep === labels.length) ? (
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
export default CheckoutForm
