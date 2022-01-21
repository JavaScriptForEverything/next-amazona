import { LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, Legend } from 'recharts'

// import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'



const data = [
  {	name: 'jun', range: 4000, price: 2400, value: 2400 },
  {	name: 'feb', range: 3000, price: 1398, value: 2210 },
  {	name: 'mar', range: 2000, price: 9800, value: 2290 },
  {	name: 'app', range: 2780, price: 3908, value: 2000 },
  {	name: 'jun', range: 1890, price: 4800, value: 2181 },
  {	name: 'jul', range: 2390, price: 3800, value: 2500 },
  {	name: 'aug', range: 3490, price: 4300, value: 2100 },
]

const Revinue = ({ year, onChange=f=>f, chartData=[] }) => {


	return (
		<>
			<Box sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				// p: 1,
				overflow: 'auto',
				whiteSpace: 'nowrap'
			}}>
				<Typography>Revinue</Typography>
				<Button sx={{ textTransform: 'capitalize' }}>This Year</Button>
				<Button sx={{ textTransform: 'capitalize' }}>Last Year</Button>

				<FormControl >
					<InputLabel>Year</InputLabel>
					<Select sx={{ minWidth: 80 }} label='Year' value={year} onChange={onChange}>
						<MenuItem value={0}></MenuItem>
						{[...Array(31)].map((item, index) => `202${index}`).map((year, key) => <MenuItem key={key}
							value={year}>{year}</MenuItem>
							)}
					</Select>
				</FormControl>
			</Box>

			<Box sx={{ overflow: 'auto'}}>
				<LineChart width={500} height={300} data={data} margin={{ top: 10 }} >
					<Line dataKey='value' type='natural' stroke='green' />
					<Line dataKey='price' type='natural' />
					<CartesianGrid strokeDasharray='5 5' />
					<Tooltip />
					<XAxis dataKey='name' />
					<YAxis />
					<Legend verticalAlign='top' />
				</LineChart>
			</Box>
		</>
	)
}
export default Revinue
