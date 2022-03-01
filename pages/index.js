import nookies from 'nookies'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wrapper } from '../store'
import { getAllProducts, getProductsOnScroll } from '../store/productReducer'

import Layout from '../layout'
import Search from '../components/home/leftPanel/search'
// import Search from '../components/home/search' 							// later complete it or md: Search
import NoResultFound from '../components/home/noResultFound'
import ViewHandler from '../components/home/viewHandler'
import CommonFilter from '../components/home/filter/commonFilter'
import LeftPanel from '../components/home/leftPanel'
import ProductGridView from '../components/home/productGridView'
import ProductListView from '../components/home/productListView'


import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'


const Home = () => {
	const dispatch = useDispatch()
	const [ viewMode, setViewMode ] = useState(0)
	const { products, total: totalProducts } = useSelector(state => state.product)
	const [ page, setPage ] = useState(2)
	const [ limit, setLimit ] = useState(1)

	// console.log({ totalProducts, length: products.length })


	/* applying infinite Sercing
			1. check is retched to bottom of the screen - footerWeight
			2. Call the API, and append products in state.products
	*/


	useEffect(() => {
		const { token } = nookies.get(null)
		dispatch(getProductsOnScroll({page, limit, token}))
	}, [page, limit])

	const handleScroll = (evt) => {
		// // Find footer section's Height by javascript then minux from isRetchedToEnd
		// const footer = document.querySelector('#footer')
		// console.log(footer.clientHeight)


		const { scrollTop, clientHeight, scrollHeight } = document.documentElement

		const isRetchedToEnd 			= scrollTop + clientHeight === scrollHeight
		const isProductAvailable 	= products.length < totalProducts

		if( isRetchedToEnd && isProductAvailable) setPage(page + 1)
	}
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])



	return (
		<Layout>
			{/*-----[ Top Searchbar will show only in desktop view ]-----*/}
			<Box component='aside' sx={{display: 'flex', justifyContent: 'flex-end', mb: 2 }} >
				<Search sx={{display: {xs: 'none', md: 'block'}, minWidth: 350 }} />
			</Box>

			<Grid component='section' container spacing={1}>
				{/*-----[ Left Panel ]-----*/}
				<Grid component='aside' item xs={12} sm={4} md={3}>
					<LeftPanel sx={{mt: { xs: 0, sm: 7}, mb: 4}} />
				</Grid>

				{/*-----[ Right Panel ]-----*/}
				<Grid component='aside' item xs={12} sm={8} md={9}>

					{/*-----[ Right Panel: Head Section ]-----*/}
					<Box component='article' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2}} >
						<Typography>{products.length} items found</Typography>
						<CommonFilter sx={{flexGrow: 2, maxWidth: 300 }}  />
						<ViewHandler viewMode={viewMode} setViewMode={setViewMode} />
					</Box>



					{/*-----[ Right Panel: Products Card ]-----*/}
					<Box  component='article' sx={{ mt: 2 }}>

					{!products.length && <NoResultFound /> }

						{viewMode ? ( 														// Grid View
							<Grid  component='article' container spacing={2}>
							{products.map((product, key) => (
								<Grid key={key} item xs={12} sm={6} md={4}>
									<ProductGridView product={product} />
								</Grid>
							))}
							</Grid>
						) : ( 																		// List View
						<>
							{products.map((product, key) => (
								<Grid  component='article' key={key}>
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


