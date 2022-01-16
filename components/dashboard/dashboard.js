import { useState } from 'react'

import Graph from './dashboard/graph'
import Revinue from './dashboard/revinue'
import TopProducts from './dashboard/topProducts'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'



const graphItems = [
	{ title: 'Today\'s Review', value: 325, graph: 'Reviews Array' },
	{ title: 'Today\'s Orders', value: 25, 	graph: 'Orders Array' },
	{ title: 'Total Products', 	value: 4325,graph: 'products Array' },
	{ title: 'Today\s Visitor', value: 425, graph: 'visitors Array' },
]

const Dashboard = () => {
	const [ revinueYear, setRevinueYear ] = useState('')

	const revinueChartHandler = (evt) => setRevinueYear(evt.target.value)
	console.log({ revinueYear })

	return (
		<>
			<Grid container spacing={1}>
				{ graphItems.map(({title, value, graph}, key) => <Grid key={key} item xs={12} sm={2} md={3}>
					<Paper sx={{ p: 1 }}>
						<Graph
							title={title}
							value={value}
							graph={graph}
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
						/>
					</Paper>
				</Grid>
			</Grid>

			<Paper sx={{ my: 2, px: 2, py: 1 }}>
				Hello
			</Paper>
		</>
	)
}
export default Dashboard
