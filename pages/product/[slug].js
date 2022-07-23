import { useSelector } from 'react-redux'
import { wrapper } from '../../store'
import { getProductBySlug } from '../../store/productReducer'

import Layout from '../../layout'
import ProductFeatures from '../../components/productDetails/productFeatures'
import ProductOverview from '../../components/productDetails/overview'
import ProductComments from '../../components/productDetails/productComments'
import Carousel from '../../components/carousel'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

const ProductDetails = () => {
	const { product } = useSelector(state => state.product)
	// console.log(product)

	return (
		<Layout title={product.slug} description={product.description}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Paper sx={{ p: 1 }}>
						<Carousel images={[
							product.coverImage.secure_url,
							...product.images.map(image => image.secure_url)
						]} />
					</Paper>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Paper sx={{p: 2}}>
						<ProductOverview />
					</Paper>
				</Grid>
			</Grid>

			{/*---[ middle section ]---*/}
			<Box sx={{ mt: 1 }}>
				<Grid container spacing={2} >
					<Grid item xs={12} sm={9} >
						<Paper sx={{p: 2}}>
							<ProductFeatures />
						</Paper>
					</Grid>

					<Grid item xs={12} sm={3} >
						<Paper sx={{p: 2}}>
							<ProductOverview />
						</Paper>
					</Grid>

				</Grid>
			</Box>


			{/*---[ Comment section ]---*/}
			<Box sx={{ mt: 1 }}>
				<Grid container spacing={2} >
					<Grid item xs={12} >
						<Paper sx={{p: 2}}>
							<ProductComments />
						</Paper>
					</Grid>
				</Grid>
			</Box>




		</Layout>
	)
}
export default ProductDetails


export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async (ctx) => {
	await dispatch(getProductBySlug(ctx))

	// console.log(ctx.params.slug)
	// return { props: {}}
})
