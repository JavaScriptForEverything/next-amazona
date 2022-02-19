import Search from './search'
import Rating from './rating'
import Brand from './brand'
import PriceRating from './priceRating'
import Size from './size'

import Box from '@mui/material/Box'

const LeftPanel = ({ ...params}) => {
	return (
		<Box {...params}>
			<Search sx={{display: { xs: 'block', md: 'none' } }} />
			<Rating />
			<Brand />
			<PriceRating />
			<Size />
		</Box>
	)
}
export default LeftPanel


