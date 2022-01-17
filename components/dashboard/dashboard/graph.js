import dynamic from 'next/dynamic'

import { AreaChart, Area } from 'recharts'


import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const data = [
  {	name: 'Page A', range: 4000, price: 2400, value: 2400 },
  {	name: 'Page B', range: 3000, price: 1398, value: 2210 },
  {	name: 'Page C', range: 2000, price: 9800, value: 2290 },
  {	name: 'Page D', range: 2780, price: 3908, value: 2000 },
  {	name: 'Page E', range: 1890, price: 4800, value: 2181 },
  {	name: 'Page F', range: 2390, price: 3800, value: 2500 },
  {	name: 'Page G', range: 3490, price: 4300, value: 2100 },
]

const Graph = ({ title, value }) => {

	const { clientHeight, clientWidth } = document.documentElement

	return (
		<>
			<Typography color='textSecondary'>{title}</Typography>
			<Typography variant='h6' paragraph> ${value.toFixed(2)} </Typography>

			<Box sx={{ display: { xs: 'block', md: 'none'} }} >
				<AreaChart width={285} height={100} data={data} >
					<Area dataKey='value' />
				</AreaChart>
			</Box>

			<Box sx={{ display: { xs: 'none', md: 'block'} }} >
				<AreaChart width={195} height={100} data={data} >
					<Area dataKey='value' />
				</AreaChart>
			</Box>

		</>
	)
}
// export default Graph
export default dynamic(() => Promise.resolve(Graph), {ssr: false})
