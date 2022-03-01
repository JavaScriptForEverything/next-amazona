import nookies from 'nookies'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { addFilter } from '../../../store/productReducer'

import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ListItem from '@mui/material/ListItem'
import Rating from '@mui/material/Rating'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const RatingComponent = () => {
	const router = useRouter()
	const dispatch = useDispatch()

	const { token } = nookies.get(null)

	const ratingsClickHandler = (ratings) => (evt) => {
		// 1. Work on SSR on page refresh
		router.push(`?ratings=${ratings}`, undefined, { shallow: true })

		// 2. Work on click on XHR Request
		dispatch(addFilter('ratings', ratings, token)) 	// key, value, token
	}

	return (
		<Accordion defaultExpanded={false}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography color='primary'> Ratings</Typography>
			</AccordionSummary>
			<AccordionDetails>
					{[1, 2, 3, 4, 5].reverse().map((value, key) => <ListItem key={key}
						sx={{cursor: 'pointer'}}
						onClick={ratingsClickHandler(value)}
					>
						<Rating
							size='small'
							name='product rating'
							defaultValue={value}
							precision={.2}
							readOnly
						/>
					</ListItem> )}
			</AccordionDetails>
		</Accordion>
	)
}
export default RatingComponent
