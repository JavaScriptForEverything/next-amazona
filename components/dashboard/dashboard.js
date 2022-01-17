import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../store/paymentReducer'
import nookies from 'nookies'

import Graph from './dashboard/graph'
import Revinue from './dashboard/revinue'
import TopProducts from './dashboard/topProducts'
import ProductStatus from './dashboard/statusPi'
import OrderTable from './order/table'


import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'




const graphItems = [
	{ title: 'Today\'s Review', value: 325, graph: 'Reviews Array' },
	{ title: 'Today\'s Orders', value: 25, 	graph: 'Orders Array' },
	{ title: 'Total Products', 	value: 4325,graph: 'products Array' },
	{ title: 'Today\s Visitor', value: 425, graph: 'visitors Array' },
]
const topProductsListItems = [
	{ avatar: '/user.jpg', title: 'Best Shirt', subheader: 'Shirt', price: 432 },
	{ avatar: '/user.jpg', title: 'Fit Shirt', 	subheader: 'Shirt', price: 423 },
	{ avatar: '/user.jpg', title: 'Polo Shirt', subheader: 'Shirt', price: 342 },
	{ avatar: '/user.jpg', title: 'Git Shirt', 	subheader: 'Shirt', price: 324 },
]

const Dashboard = () => {
	const dispatch = useDispatch()
	const { token } = nookies.get(null)

	const [ revinueYear, setRevinueYear ] = useState('')
	const [ topProductSelectedItem, topProductSetSelectedItem ] = useState(0)

	const { error, loading, orders, countPage } = useSelector(state => state.payment)

	useEffect(() => {
		token && dispatch(getOrders(token, { page: 1, limit: 3 }))
	}, [])

	const revinueChartHandler = (evt) => setRevinueYear(evt.target.value)
	const topProductsItemClickHandler = (evt, key) => topProductSetSelectedItem(key)

	console.log({ revinueYear })



	return (
		<>
			<Grid container spacing={1}>
				{ graphItems.map(({title, value, graph}, key) => <Grid key={key} item xs={12} sm={2} md={3}>
					<Paper sx={{ p: 1 }}>
						<Graph
							title={title}
							value={value}
							data={graph}
						/>
					</Paper>
				</Grid>
				)}
			</Grid>

			{/*------[ 2nd Row: Left-Side ]------*/}
			<Grid container spacing={1} sx={{ mt: 1 }}>
				<Grid item xs={12} md={8}>
					<Paper sx={{ py: 2, px: 1 }}>
						<Revinue
							year={revinueYear}
							onChange={revinueChartHandler}
							chartData={'chartData'}
						/>
					</Paper>
				</Grid>

			{/*------[ 2nd Row: Right-Side ]------*/}
				<Grid item xs={12} md={4}>
					<Paper sx={{ py: 2, px: 1 }}>
						<TopProducts
							title='Top Products'
							items={topProductsListItems}
							select={topProductSelectedItem}
							onClick={topProductsItemClickHandler}
						/>
					</Paper>
				</Grid>
			</Grid>

			{/*------[ 3rd Row: Left-Side ]------*/}
			<Grid container spacing={1} sx={{ mt: 1 }}>
				<Grid item xs={12} md={4}>
					<Paper sx={{ py: 2, px: 1 }}>
						<ProductStatus
							title='Product Status'
						/>
					</Paper>
				</Grid>

			{/*------[ 3rd Row: Right-Side ]------*/}
				<Grid item xs={12} md={8}>
					<Paper sx={{ py: 2, px: 1 }}>
						<Box sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
							<Typography variant='h6' color='primary' >Recent Orders</Typography>
							<Button sx={{textTransform: 'capitalize'}} onClick={(f) => f}>See All</Button>
						</Box>
						<OrderTable orders={orders} />
					</Paper>
				</Grid>
			</Grid>
		</>
	)
}
export default Dashboard
