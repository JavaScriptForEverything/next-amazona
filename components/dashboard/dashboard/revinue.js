
// import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

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

			<Typography>{chartData}</Typography>
		</>
	)
}
export default Revinue
