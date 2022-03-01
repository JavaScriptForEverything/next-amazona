import nookies from 'nookies'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { addFilter } from '../../../store/productReducer'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'



const Size = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { token } = nookies.get(null)

	const clickHandler = (evt, size) => {
		// console.log({ item })

		// 1. Work on SSR on page refresh
		router.push(`?size=${size}`, undefined, { shallow: true })

		// 2. Work on click on XHR Request
		dispatch(addFilter('size', size, token)) 	// key, value, token
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
