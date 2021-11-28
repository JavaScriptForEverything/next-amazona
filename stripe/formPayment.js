import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPaymentInfo } from '../store/paymentReducer'

import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import StripeInput from './stripeInput'
import { countries } from 'countries-list'
// import { paymentItems } from './data'

import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { TabPanel } from '../util'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

const cardItems = [
	{ label: 'Card Number', component: CardNumberElement },
	{ label: 'Expiration Date', component: CardExpiryElement },
	{ label: 'CVC', component: CardCvcElement }
]
const countriesList = Object.values(countries)
const defaultCountry = countriesList.find(country => country.name === 'United States')

const PaymentDetails = () => {
	const [ value, setValue ] = useState(0) 						// to set Tabs
	const dispatch = useDispatch()
	const { totalPrice } = useSelector(state => state.dialog)

	const tabHandler = (evt, newValue) => setValue(newValue)
	const changeHandler = (evt, country) => {
		// dispatch(addPaymentInfo({...paymentObj, [evt.target.name]: evt.target.value}))
		dispatch(addPaymentInfo({currency: country?.currency}))
	}

	// console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

	return (
		<Box>
					<Tabs value={value} onChange={tabHandler} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }} >
						<Tab label='Payment Details'  />
					</Tabs>

					{/*-----[ Update Password Form ]-----*/}
					<TabPanel value={value} index={0} >
						<Autocomplete
							options={countriesList}
							getOptionLabel={country => `${country.emoji} ${country.name} (${country.currency})`}
							renderInput={params => <TextField {...params}
								label='Currency'
								InputLabelProps={{ shrink: true }}
								placeholder='Currency'
								required
							/>}
							onChange={(evt, country) => changeHandler(evt, country)}
							// value={{ emoji: defaultCountry.emoji, name: defaultCountry.name, currency: defaultCountry.currency }}

						/>
						<TextField
								sx={{ mt: 2 }}
								label='Amount'
								placeholder='Amount'
								InputLabelProps={{ shrink: true }}
								type='number'
								fullWidth
								required
								value={totalPrice}
							/>


						{ cardItems.map(({label, component}) => <TextField key={label}
								sx={{ mt: 2 }}
								label={label}
								InputLabelProps={{ shrink: true }}
								fullWidth
								required
								InputProps={{
									inputProps: { component },
									inputComponent: StripeInput
								}}
							/>
						)}

				</TabPanel>
		</Box>
	)
}
export default PaymentDetails
