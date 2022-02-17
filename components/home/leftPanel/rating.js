import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ListItem from '@mui/material/ListItem'
import Rating from '@mui/material/Rating'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const RatingComponent = () => {

	const ratingsClickHandler = (evt, value) => {
		console.log(value)
	}

	return (
		<Accordion defaultExpanded={false}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography color='primary'> Ratings</Typography>
			</AccordionSummary>
			<AccordionDetails>
					{[1, 2, 3, 4, 5].reverse().map((value, key) => <ListItem key={key}
						sx={{cursor: 'pointer'}}
						onClick={evt => ratingsClickHandler(evt, value)}
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
