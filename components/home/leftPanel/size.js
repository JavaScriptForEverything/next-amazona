// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getProductBrands } from '../../../store/productReducer'
// import nookies from 'nookies'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'



const Size = () => {
	const clickHandler = (evt, item) => {
		console.log({ item })
	}

	return (
		<Accordion defaultExpanded={false}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography color='primary'>Size</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<ButtonGroup>
					{['xs', 'sm', 'lg', 'xxl'].map(item => <Button key={item}
						onClick={(evt) => clickHandler(evt, item)}
					>{item}</Button> )}
				</ButtonGroup>
			</AccordionDetails>
		</Accordion>
	)
}
export default Size
