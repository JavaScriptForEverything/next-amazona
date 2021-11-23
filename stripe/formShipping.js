import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addShippingInfo } from '../store/paymentReducer'

import { shippingItems } from './data'
import { countries } from 'countries-list'


import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import NoSsr from '@mui/material/NoSsr'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { TabPanel } from '../util'

// import InputAdornment from '@mui/material/InputAdornment'
// import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'

// import EmailIcon from '@mui/icons-material/Email'


const countriesList = Object.values(countries)
// console.log(countriesList[0])

const ShippingForm = () => {
	const [ value, setValue ] = useState(0) 						// to set Tabs
	const dispatch = useDispatch()
	const { shippingObj } = useSelector(state => state.payment)
	// console.log( shippingObj )


	// const [ fields, setFields ] = useState(shippingObj)
	// console.log( fields )



	const tabHandler = (evt, newValue) => setValue(newValue)
	const changeHandler = (evt, country) => {
		dispatch(addShippingInfo({
			...shippingObj, [evt.target.name]: evt.target.value,
			country: {emoji: country?.emoji, name: country?.name}
		}))
	}


	return (
		<Box>
			<Tabs value={value} onChange={tabHandler} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }} >
				<Tab label='Shipping Info'  />
			</Tabs>

			<NoSsr>
				{/*-----[ Update Password Form ]-----*/}
				<TabPanel value={value} index={0} >
					{shippingItems.map(({label, name, type}, index) => name !== 'country' ? (
						<TextField key={index}
							sx={ index === 0 ? {} : { mt: 2 } }
							label={label}
							type={type}
							name={name}
							fullWidth
							required
							// InputProps={{
							// 	startAdornment: <InputAdornment position='start'><EmailIcon /></InputAdornment>
							// }}
							value={shippingObj[name]}
							onChange={changeHandler}
							// error={!fields.email || !!fieldErrors.email}
							// helperText={fieldErrors.email}
						/>
					) : (
						<Autocomplete key={index}
							options={countriesList}
							getOptionLabel={country => `${country.emoji} ${country.name}`}
							renderInput={params => <TextField {...params}
								sx={{ mt: 2 }}
								label={label}
								type={type}
								// name={name}
								fullWidth
								required
							/>}
							onChange={(evt, country) => changeHandler(evt, country)}
							// value={{ emoji: shippingObj.emoji, name: shippingObj.name }}
							value={shippingObj.country}
						/>
					)
					)}
				</TabPanel>
			</NoSsr>
		</Box>
	)
}
export default ShippingForm
