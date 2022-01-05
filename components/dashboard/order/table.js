import { useState } from 'react'

import { idFormatter, dateFormatter, priceFormatter } from '../../../util'

import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'






const header = ['Order No', 'Date', 'Name', 'Email', 'Price', 'Status', 'Actions']

const orders = [
	{
		"_id" : ("61a4e1f9e106d75825079906"), 				// id
		"createdAt" : ("2021-11-29T14:21:45.862Z"), 	// Date
		"shipping" : {
			"username" : "riajul islam", 								// name
			"email" : "abc@gmail.com", 									// email
		},
		"payment" : {
			"amount" : 215,															// price with currency
			"currency" : "bdt"
		},
		"isPaid" : false,  														// status
		// "actions" my button 												// <Button>
	},
	{
		"_id" : ("61b37f79bdb7b3879d8c20d0"),
		"createdAt" : ("2021-12-10T16:25:29.260Z"),
		"shipping" : {
			"username" : "riajul islam",
			"email" : "abc@gmail.com",
		},
		"payment" : {
			"amount" : 123,
			"currency" : "bdt"
		},
		"isPaid" : true,
	}
]




const MyTable = () => {
	const [ open, setOpen ] = useState(false)
	const [ anchorEl, setAnchorEl ] = useState(null)
	const [ orderId, setOrderId ] = useState(0)


	const menuCloseHandler = () => {
		setOpen(false)
		setAnchorEl(null)
	}
	const actionHandler = (evt, order) => {
		setOpen(true)
		setAnchorEl(evt.target)

		setOrderId(order._id) 			// set order to so that item handler can access it
	}
	const menuItemHandler = (evt) => {
		menuCloseHandler()

		console.log(orderId)
	}


	return(
		<TableContainer component={Paper}>
			<Table
				size='small'
			>
				<TableHead>
					<TableRow sx={{backgroundColor: (theme) =>	theme.palette.primary.main, }}>
						{header.map((item, key) => <TableCell key={key}
							sx={{color: '#ffffff', fontWeight: 600 }}
						>{item}</TableCell>)}
					</TableRow>
				</TableHead>

				<TableBody>
					{orders.map( (item, key) => (
					<TableRow key={key} >
						<TableCell>{idFormatter(item._id)}</TableCell>
						<TableCell>{dateFormatter(item.createdAt)}</TableCell>
						<TableCell>{item.shipping.username}</TableCell>
						<TableCell>{item.shipping.email}</TableCell>
						<TableCell>{priceFormatter(item.payment.amount)}</TableCell>
						<TableCell>
							<Button
								variant='outlined'
								size='small'
								color= {item.isPaid ? 'warning' : 'error' }
								sx={{ textTransform: 'capitalize' }}
							>
								{item.isPaid ? 'Delivered' : 'Pending' }
							</Button>
						</TableCell>

						<TableCell align='center'>
							<IconButton onClick={(evt) => actionHandler(evt, item)}><MoreVertIcon /></IconButton>
						</TableCell>
					</TableRow>
					))}


					<Menu open={open} anchorEl={anchorEl} onClose={menuCloseHandler} >
						<MenuItem
							onClick={menuItemHandler}
							dense
							divider
						>
							<ListItemIcon> <DeleteIcon /> </ListItemIcon>
							<ListItemText>Delete</ListItemText>
						</MenuItem>
					</Menu>


				</TableBody>
			</Table>


		</TableContainer>
	)
}
export default MyTable
