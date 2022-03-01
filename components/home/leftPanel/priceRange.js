import nookies from 'nookies'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { addFilter } from '../../../store/productReducer'

// import { useDispatch, useSelector } from 'react-redux'
// import { getProductBrands } from '../../../store/productReducer'
// import nookies from 'nookies'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Slider from '@mui/material/Slider'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


const sliderInputs = [
	{ label: '$0', 		name: 'min' },
	{ label: '$100', 	name: 'max' },
]
const sliderInputsObj = {}
sliderInputs.forEach((item, index) => sliderInputsObj[item.name] = index * 100 )


const PriceRating = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { token } = nookies.get(null)

	const [ sliderValue, setSliderValue ] = useState([0, 50]) 						// filter-slider
	const [ sliderFields, setSliderFields ] = useState(sliderInputsObj)

	const sliderOnChangeHandler = (evt, newValue) => setSliderValue(newValue)
	const sliderInputHandler = (evt, name) => setSliderFields({ ...sliderFields, [name]: evt.target.value })
	const sliderSubmitHandler = (evt) => {
		evt.preventDefault()

		const currentValue = sliderValue.map(item => item * (sliderFields.max - sliderFields.min))
		// console.log({ currentValue })

		// 1. Work on SSR on page refresh
		router.push(`?price=${currentValue}`, undefined, { shallow: true })

		// 2. Work on click on XHR Request
		dispatch(addFilter('price', currentValue, token)) 	// key, value, token
	}

	return (
		<Accordion defaultExpanded={false}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography color='primary'> Price Range </Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Slider
					step={5}
					marks={[{label: 'Min', value: 0}, {label: 'Max', value: 100}]}
					valueLabelDisplay='auto'
					value={sliderValue}
					onChange={sliderOnChangeHandler}
					// valueLabelFormat={(currentValue) => currentValue * 10}
					valueLabelFormat={(currentValue) => currentValue * (sliderFields.max - sliderFields.min)}
				/>
				<form noValidate onSubmit={sliderSubmitHandler}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 5, mb: 2 }}>
						{sliderInputs.map(({label, name}, key) =>
							<TextField key={key}
								placeholder={label}
								type='number'
								value={sliderFields[name]}
								onChange={(evt) => sliderInputHandler(evt, name)}
								autoFocus={key === 1}
							/>
						)}
					</Box>
					<Button type='submit' fullWidth variant='contained'>Apply</Button>
				</form>
			</AccordionDetails>
		</Accordion>
	)
}
export default PriceRating
