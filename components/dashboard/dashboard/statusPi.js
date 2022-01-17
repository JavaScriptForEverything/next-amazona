import { PieChart, Pie } from 'recharts'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const data = [
  {	name: 'jun', range: 4000, price: 2400, value: 2400 },
  {	name: 'feb', range: 3000, price: 1398, value: 2210 },
  {	name: 'mar', range: 2000, price: 9800, value: 2290 },
  {	name: 'app', range: 2780, price: 3908, value: 2000 },
  {	name: 'jun', range: 1890, price: 4800, value: 2181 },
  {	name: 'jul', range: 2390, price: 3800, value: 2500 },
  {	name: 'aug', range: 3490, price: 4300, value: 2100 },
]


const StatusPi = ({title=''}) => {
	return (
		<>
			<Typography variant='h6' color='primary' >{title}</Typography>

			<Box sx={{display: 'flex', justifyContent: 'center'}} >
				<PieChart width={250} height={250} >
	  			<Pie
	  				data={data}
	  				dataKey="value"
	  				nameKey="name"
	  				outerRadius={30}
	  				fill="#8884d8"
	  			/>
	  			<Pie
	  				data={data}
	  				label
	  				dataKey="value"
	  				nameKey="name"
	  				innerRadius={40}
	  				outerRadius={60}
	  				// fill="#82ca9d"
	  				fill="#1976d2"
	  			/>
				</PieChart>
			</Box>
		</>
	)
}
export default StatusPi
