// make every table header as button so that we can filter by click on that table, same as excel filter

import { useState } from 'react'
import Image from 'next/image'

import { idFormatter, priceFormatter } from '../../../util'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Pagination from '@mui/material/Pagination'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'


const tableLimitOptions = [...Array(10)].map((item, index) => index + 1)

const TableComponent = (props) => {
	const {
		title='',
		data=[],
		countPage=3,
		itemHandler=f=>f,
		limit=0,
		limitHandler=f=>f,
		page=1,
		pageHandler=f=>f,
	} = props

	const [ open, setOpen ] = useState(false)
	const [ anchorEl, setAnchorEl ] = useState(null)
	const [ customerId, setCustomerId ] = useState('')


	const actionHandler = (evt, custID) => {
		setAnchorEl(evt.target)
		setOpen(true)
		setCustomerId(custID)
	}
	const menuCloseHandler = () => {
		setOpen(false)
		setAnchorEl(null)
	}
	const menuItemHandler = (evt) => {
		menuCloseHandler()

		itemHandler(evt, customerId)
		// console.log({ customerId })
	}

	return (
		<>
			<TableContainer sx={{ px: 1, py: 2}} >

				{ title && <Typography color='primary' paragraph variant='h6'> {title} </Typography> }

				<Table size='small' >
					<TableHead>
						<TableRow sx={{ backgroundColor: (theme) => theme.palette.primary.main}}>
							{[
								'Customer Name', 		// avatar + name
								'# ID',
								'Spent', 						// total proce of customer
								'Last Order', 			// last transaction time
								'Email',
								'Phone',
								'Status', 						// active | inactive 	=> active=true,
								'Actions'
							].map((item, key) => <TableCell key={key} sx={{ whiteSpace: 'nowrap', color: '#ffffff', fontWeight: 600}} >{item}</TableCell> )}
						</TableRow>
					</TableHead>

					<TableBody>
						{data.map((user, key) => <TableRow key={key} >
							<TableCell sx={{
								display: 'flex',
								gap: 1,
								alignItems: 'center',
								whiteSpace: 'nowrap',
							}} >
								<img src={user?.avatar.secure_url} width={50} height={50} layout='responsive' />
								<Typography > {user.username} </Typography>
							</TableCell>

							<TableCell>{idFormatter(user._id)}</TableCell>
							<TableCell>{priceFormatter(user.price || 0)}</TableCell>
							<TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.phone}</TableCell>
							<TableCell>
								<Button
									variant='outlined'
									color={user.active ? 'success' : 'error'}
								>
									{user.active ? 'Active' : 'Inactive'}
								</Button>
							</TableCell>


							<TableCell>
								<IconButton onClick={(evt) => actionHandler(evt, user._id)}>
									<MoreVertIcon />
								</IconButton>
							</TableCell>

							</TableRow>
						)}
					</TableBody>
				</Table>

				<Menu
					open={open}
					anchorEl={anchorEl}
					onClose={menuCloseHandler}
				>
					<MenuItem dense divider onClick={menuItemHandler} >
						<ListItemIcon><DeleteIcon /></ListItemIcon>
						<ListItemText>Delete</ListItemText>
					</MenuItem>
				</Menu>
			</TableContainer>

			<Box sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: 2,
				px: 1,
				pb: 2
			}}>
				<Autocomplete
					options={tableLimitOptions}
					getOptionLabel={option => `${option}`}
					renderInput={params => <TextField {...params} />}

					value={limit}
					onChange={limitHandler}
				/>

				{countPage && countPage != 1 && <Pagination
					shape='rounded'
					color='primary'
					boundaryCount={0}
					siblingCount={1}
					hidePrevButton
					hideNextButton

					count={countPage}
					page={page}
					onChange={pageHandler}
				/>}
			</Box>
		</>
	)
}
export default TableComponent

