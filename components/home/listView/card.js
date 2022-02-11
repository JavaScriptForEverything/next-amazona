import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../../../store/dialogReducer'
import { addItemToCart } from '../../../store/productReducer'

// import { shorter } from '../../../util'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
// import CardContent from '@mui/material/CardContent'
// import CardActions from '@mui/material/CardActions'
import Badge from '@mui/material/Badge'
import Rating from '@mui/material/Rating'

// import MoreVertIcon from '@mui/icons-material/MoreVert'


const ListComponent = ({ id, product}) => {
	const dispatch = useDispatch()
	const { cartItems } = useSelector(state => state.product)

	const addToCartHandler = (evt, product) => {
		const isFound = cartItems.find(cart => cart._id === product._id)
		if(isFound) return dispatch(showAlert({ open: true, severity: 'info', message: 'This product all ready added into cart'}))

		dispatch(addItemToCart(product))
		dispatch(showAlert({ open: true, severity: 'success', message: 'added to cart'}))
	}

	return [
		<Grid key={id} item xs={12} sm={3} >
			<Link href={`/product/${product.slug}`} passHref>
				<CardActionArea sx={{position: 'relative'}} sx={{ minHeight: 150 }} >
					<CardMedia
						component='img'
						src={product.coverImage?.secure_url || '/images/coverImage.jpg'}
						height={150}
					/>
					<Badge color='error' badgeContent='New' sx={{position: 'absolute', top: 20, left: 30, }} />
				</CardActionArea>
			</Link>
		</Grid>,

		<Grid key={`${id}-${id}`} item xs={12} sm={6} >
			<Typography color='primary'>{product.name}</Typography>
			<Box sx={{
				display: 'flex',
				gap: 2,
				alignItems: 'center',
			}}>
				<Typography>
					<Rating
						size='small'
						name='product rating'
						defaultValue={product.ratings}
						precision={.5}
						readOnly
					/>
				</Typography>

				<Typography color='primary'> {product.ratings || 4}/5 </Typography>
			</Box>
			<Typography color='textSecondary' align='justify'>{product.description}</Typography>
		</Grid>,

		<Grid key={`${id}-${id}-${id}`} item xs={12} sm={3} >
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				justifyContent: 'center',
				gap: 3,
				p: 2
			}}>
				<Typography  variant='h6' >${product.price.toFixed(2)}</Typography>
				<Button variant='contained'fullWidth onClick={(evt) => addToCartHandler(evt, product)} >Add To Cart</Button>
			</Box>
		</Grid>,

	]
}
export default ListComponent
