import { useSelector } from 'react-redux'

import { toCapitalize } from '../../util'
import AddToCart from './addToCart'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'

const ProductOverview = () => {

	const { loading, product } = useSelector(state => state.product)

	return (
		<>
			<Typography variant='h5'>{toCapitalize(product.name)}</Typography>
			<Typography variant='caption' color='textSecondary'>Product: {product._id}</Typography>

			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 2,
				my: 2
			}}>
				<Rating
					name='product details'
					precision={.5}
					defaultValue={product.ratings}
					readOnly
				/>
				<Typography component='span'>({product.numReviews.length}) Reviews</Typography>
			</Box>

			<Typography variant='h6'>${product.price.toFixed(2)}</Typography>

			<AddToCart sx={{my: 2}} />

			<Box sx={{ mt: 5 }}>
				<Typography>Description</Typography>
				<Typography variant='body2' color='textSecondary'>{product.description}</Typography>
			</Box>


		</>
	)
}
export default ProductOverview
