import Link from 'next/link'
import { useSelector } from 'react-redux'

import Layout from '../layout'
import { wrapper } from '../store'
import { getProducts } from '../store/productReducer'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'



const Home = () => {

	const { products } = useSelector(state => state.product.product)

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
								<Button>Add To Cart</Button>
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
export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async({ req }) => {
	await dispatch( getProducts(req) )
})
