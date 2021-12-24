import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'

import MoreVertIcon from '@mui/icons-material/MoreVert'

const Orders = () => {
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell component='th'>Order ID</TableCell>
						<TableCell component='th'>Date</TableCell>
						<TableCell component='th'>Customer Name</TableCell>
						<TableCell component='th'>Email</TableCell>
						<TableCell component='th'>Price</TableCell>
						<TableCell component='th'>Actions</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					<TableRow>
						<TableCell component='td'>54432345234abcdf</TableCell>
						<TableCell component='td'>{new Date().toLocaleString()}</TableCell>
						<TableCell component='td'>Riajul Islam</TableCell>
						<TableCell component='td'>abc@gmail.com</TableCell>
						<TableCell component='td'>$34.00</TableCell>
						<TableCell component='td'>
							<IconButton>
								<MoreVertIcon />
							</IconButton>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}
export default Orders
