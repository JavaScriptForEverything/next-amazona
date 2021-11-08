import { useEffect } from 'react'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, showAlert } from '../store/dialogReducer'

import Link from 'next/link'

import Layout from '../layout'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'



const Home = ({ products }) => {
	const dispatch = useDispatch()
	const { cartItems } = useSelector(state => state.dialog)


	const addToCartHandler = (evt, product) => {
		const	itemFound = cartItems.some(item => item._id === product._id )

		// if(itemFound) return console.log(`this item (${id}) already added to cart`)
		const message = 'This item already added to cart'
		if(itemFound) return dispatch(showAlert({ open: true, severity: 'success', message}))
		dispatch(addItemToCart(product))
	}

	return (
		<Layout>
			<Typography variant='h3'>Home Page</Typography>
			<Link href='/about'><Button>About</Button></Link>

			<Grid container spacing={3} >
				{products && products.map((product, key) => (
					<Grid key={key} item md={4} >

						<Card>
							<Link href={`/product/${product.slug}`}>
							<CardActionArea>
								<CardMedia component='img'src={product.image} />
							</CardActionArea>
							</Link>
							<CardContent>
								<Typography>{product.name}</Typography>
							</CardContent>
							<CardActions>
								${product.price}
								<Button onClick={(evt) => addToCartHandler(evt, product)} >Add To Cart</Button>
							</CardActions>
						</Card>

					</Grid>
				))}
			</Grid>
		</Layout>
	)
}
export default Home



// must await to get data from server, no matter we await in getProducts()
export const getServerSideProps = async ({req}) => {

	const { origin } = absoluteUrl(req)
	const { data } = await axios.get(`${origin}/api/products`)

	return { props: { products: data.products }}
}
