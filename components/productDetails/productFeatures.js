import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import LinearProgress from '@mui/material/LinearProgress'

import StarIcon from '@mui/icons-material/Star'

const ProductFeatures = () => {
	const { product } = useSelector(state => state.product )

	return (
		<>
			<Typography variant='h6' paragraph>Description</Typography>
			<Typography
				variant='body2'
				color='textSecondary'
			>{product.description}</Typography>


			<Box sx={{ mt: 4 }}>
				<Typography paragraph>Ratings And Reviews </Typography>

				<Box sx={{
					display: 'flex',
					gap: 4
				}}>
					<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
						<Typography variant='h3'>4.4</Typography>
						<Rating
							name='reviewRating'
							precision={.2}
							defaultValue={4.4}
							readOnly
							icon={<StarIcon color='success' />}
						/>
						<Typography variant='body2'>89.34</Typography>
					</Box>


					<Box sx={{ width: '100%' }}>
					{[5,4,3,2,1].map(item => (
						<Box key={item}>
							<Box sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 2,
								flex: 1
							}}>
								<Typography variant='body2'>{item}</Typography>
								<Box sx={{ width: '100%'}} >
									<LinearProgress
										variant='determinate'
										color='success'
										value={item * 10}
									/>
								</Box>
							</Box>
						</Box>
					))}
					</Box>
				</Box>

			</Box>


		</>
	)
}
export default ProductFeatures
