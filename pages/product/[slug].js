import { wrapper } from '../../store'
import { getProductBySlug } from '../../store/productReducer'

import Layout from '../../layout'
import ImageSlide from '../../components/productDetails/imageSlide'
import ProductOverview from '../../components/productDetails/overview'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

const ProductDetails = () => {
	return (
		<Layout title={'product name'} description={'meta data description'}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Paper sx={{ p: 1 }}>
						<ImageSlide />
					</Paper>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Paper sx={{p: 2}}>
						<ProductOverview />
					</Paper>
				</Grid>
			</Grid>
		</Layout>
	)
}
export default ProductDetails


export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async (ctx) => {
	await dispatch(getProductBySlug(ctx))

	// console.log(ctx.params.slug)
	// return { props: {}}
})
