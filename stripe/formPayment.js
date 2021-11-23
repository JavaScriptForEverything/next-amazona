import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { addPaymentInfo } from '../store/stripeReducer'

// import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
// import StripeInput from './stripeInput'
import { paymentItems } from './data'

import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { TabPanel } from '../util'

import TextField from '@mui/material/TextField'


// const cardItems = [
// 	{ label: 'Card Number', component: CardNumberElement },
// 	{ label: 'Expiration Date', component: CardExpiryElement },
// 	{ label: 'CVC', component: CardCvcElement }
// ]


const PaymentDetails = () => {
	const [ value, setValue ] = useState(0) 						// to set Tabs
	const dispatch = useDispatch()
	// const { paymentObj } = useSelector(state => state.stripe)

	const tabHandler = (evt, newValue) => setValue(newValue)
	const changeHandler = (evt) => {
		// dispatch(addPaymentInfo({...paymentObj, [evt.target.name]: evt.target.value}))
	}


	return (
		<Box>
					<Tabs value={value} onChange={tabHandler} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }} >
						<Tab label='Payment Details'  />
					</Tabs>

					{/*-----[ Update Password Form ]-----*/}
					<TabPanel value={value} index={0} >
						{
							paymentItems.map(({label, name, type}, index) => <TextField key={index}
								sx={ index === 0 ? {} : { mt: 2 } }
								label={label}
								type={type}
								name={name}
								fullWidth
								required
								// InputProps={{
								// 	startAdornment: <InputAdornment position='start'><EmailIcon /></InputAdornment>
								// }}
								// value={paymentObj[name]}
								onChange={changeHandler}
								// error={!fields.email || !!fieldErrors.email}
								// helperText={fieldErrors.email}
							/>
							)
						}

{/*						<TextField
							label='Card Number'
							InputLabelProps={{ shrink: true }}
							fullWidth
							required
								// value={paymentObj[name]}
								// onChange={changeHandler}
								InputProps={{
									inputProps: { component: CardNumberElement },
									inputComponent: StripeInput
								}}

						/>
*/}
				</TabPanel>
		</Box>
	)
}
export default PaymentDetails
