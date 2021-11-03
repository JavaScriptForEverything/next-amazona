import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import data from '../../data'
import Layout from '../../layout'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'



const Product = () => {
	const router = useRouter()
	const { slug } = router.query

	const product = data.products.find(product => product.slug === slug )

	// console.log(product)
	if(!product) return (
		<Layout title='404 | No page Found'>
			<Typography>No product found</Typography>
		</Layout>
	)

	return (
		<Layout title={`${product.name} - Amazona`} description={product.description} >
			<Link href='/' passHref><Button sx={{ textTransform: 'capitalize'}} >Back to product</Button></Link>

			<Grid container spacing={1}>
				<Grid item xs={12} md={6} >
					<Image
						src={product.image}
						alt={product.image}
						title={product.name}
						width={400}
						height={400}
						layout='responsive'
					/>
				</Grid>
				<Grid item xs={12} md={3}>
					<List>
						<ListItem>
							<Typography component='h1' variant='h3' > {product.name} </Typography>
						</ListItem>
						<ListItem>
							<ListItemText> Category : {product.category} </ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText> Brand : {product.brand} </ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText> Rating : {product.rating} start ({product.numReviews}) reviews </ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText> Description : {product.description} </ListItemText>
						</ListItem>
					</List>
				</Grid>

				<Grid item xs={12} md={3}>
					<Paper>
						<List sx={{ display: 'flex', flexDirection: 'column' }} >
							<ListItem>
								<ListItemText> Price: ${product.price} </ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText> Status: {product.price ? 'In Stock' : 'Out of Stock'} </ListItemText>
							</ListItem>
							<ListItem>
								<Button fullWidth variant='contained' >Add To Cart</Button>
							</ListItem>
						</List>
					</Paper>
				</Grid>

			</Grid>
		</Layout>
	)
}
export default Product
