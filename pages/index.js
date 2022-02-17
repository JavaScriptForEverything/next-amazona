import { useState } from 'react'
import { useSelector } from 'react-redux'
import { wrapper } from '../store'
import { getAllProducts } from '../store/productReducer'

import Layout from '../layout'
import ViewHandler from '../components/home/viewHandler'
import CommonFilter from '../components/home/filter/commonFilter'
import LeftPanel from '../components/home/leftPanel'
import ProductGridView from '../components/home/productGridView'
import ProductListView from '../components/home/productListView'


import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'


const Home = () => {
	const [ viewMode, setViewMode ] = useState(0)
	const { products } = useSelector(state => state.product.product)
	// console.log({ products })

	return (
		<Layout>

			<Grid container spacing={1}>
				{/*-----[ Left Panel ]-----*/}
				<Grid item xs={12} sm={4} md={3}>
					<LeftPanel sx={{mt: { xs: 0, sm: 7}, mb: 4}} />
				</Grid>

				{/*-----[ Right Panel ]-----*/}
				<Grid item xs={12} sm={8} md={9}>

					{/*-----[ Right Panel: Head Section ]-----*/}
					<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2}} >
						<Typography>{4} items found</Typography>
						<CommonFilter sx={{flexGrow: 2, maxWidth: 300 }}  />
						<ViewHandler viewMode={viewMode} setViewMode={setViewMode} />
					</Box>

					{/*-----[ Right Panel: Products Card ]-----*/}
					<Box sx={{ mt: 2 }}>
						{viewMode ? ( 														// Grid View
							<Grid container spacing={2}>
							{products.map((product, key) => (
								<Grid key={key} item xs={12} sm={6} md={4}>
									<ProductGridView product={product} />
								</Grid>
							))}
							</Grid>
						) : ( 																		// List View
						<>
							{products.map((product, key) => (
								<Grid key={key}>
									<ProductListView product={product} />
								</Grid>
							))}
						</>
						)}
					</Box>
				</Grid>
			</Grid>

		</Layout>
	)
}
export default Home

export const getServerSideProps = wrapper.getServerSideProps(({dispatch}) => async(ctx) => {
	await dispatch(getAllProducts(ctx))
})


