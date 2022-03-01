// import { useState } from 'react'

import Search from './search'
import Rating from './rating'
import Brand from './brand'
import PriceRange from './priceRange'
import Size from './size'

import Box from '@mui/material/Box'
// import IconButton from '@mui/material/IconButton'

// import ArrowRightIcon from '@mui/icons-material/ArrowRight'
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'


const LeftPanel = ({ ...params}) => {
	// const [ isExpended, setIsExpended ] = useState(true)

	// const expendHandler = () => {
	// 	setIsExpended(!isExpended)
	// }

	return (
		<>
{/*		<Box sx={{
			display: 'flex',
			justifyContent: 'flex-end'
		}}
		>
			<IconButton onClick={expendHandler}>
				{ isExpended ?  <ArrowLeftIcon /> : <ArrowRightIcon /> }
			</IconButton>
		</Box>
*/}
		<Box {...params}>
			<Search sx={{display: { xs: 'block', md: 'none' } }} />
			<Rating />
			<Brand />
			<PriceRange />
			<Size />
		</Box>
		</>
	)
}
export default LeftPanel


