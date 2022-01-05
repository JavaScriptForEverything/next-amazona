import { useState } from 'react'

import OrderTable from './order/table'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined'

const filterButtons = [
	{ label: 'Category', name: 'category' },
	{ label: 'Status', name: 'status' },
	{ label: 'Price', name: 'price' },
	{ label: 'Date', name: 'date' },
]

const options = ['one', 'two', 'three']

const Orders = () => {
	const [ selectedButton, setSelectedButton ] = useState(0)
	const [ page, setPage ] = useState(1)

	const [ filterOpen, setFilterOpen ] = useState(false)
	const [ filterAnchorEl, setFilterAnchorEl ] = useState(null)

	const searchChangeHandler = () => {}

	const filterCloseHandler = () => {
		setFilterOpen(false)
		setFilterAnchorEl(null)
	}
	const filterButtonHandler = (evt) => {
		setFilterAnchorEl(evt.target)
		setFilterOpen(true)
	}

	const filterMenuItemHandler = (evt, key, item) => {
		filterCloseHandler()
		setSelectedButton(key)

		console.log(item)
	}

	const addOrderHandler = () => {
		let message = 'Open a Dialog | redirect to order page: order page shows 2 things: \n\n'
				message += '\t1.show orders,\n'
				message += '\t2. add order\n'
		console.log(message)
	}

	return (
		<>
			<Grid container>
				<Grid item xs={12} sm={6} >
					<Autocomplete
						options={options}
						getOptionLabel={option => option}
						renderInput={params => <TextField {...params}
							label='Search'
						/>}
						onChange={searchChangeHandler}
					/>
				</Grid>
			</Grid>

			{/*--------[ Filter Section ]--------*/}
			<Paper sx={{ my: 2, p: 1, display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
				{filterButtons.map(({label, name}, key) => <Button key={key}
					variant={ selectedButton === key ? 'contained' : 'outlined' }
					endIcon={ selectedButton === key ? <ExpandMoreIcon /> : <ExpandLessIcon />}
					// onClick={() => setSelectedButton(key)}
					onClick={(evt) => filterMenuItemHandler(evt, key, name)}
					sx={{ textTransform: 'capitalize' }}
					>{label}</Button>
				)}
				<Button
					variant='contained'
					startIcon={<AddCircleOutline />}
					sx={{ ml: 'auto', textTransform: 'capitalize' }}
					onClick={addOrderHandler}
				>Add Order</Button>
			</Paper>


					{/*--------[ Filter mobile View ]--------*/}
			<Paper sx={{ my: 2, p: 1, display: { xs: 'flex', sm: 'none' } }}>
				<Button
					variant='outlined'
					startIcon={<FilterAltOutlined />}
					onClick={filterButtonHandler}
				>Filter</Button>

				<Button
					variant='contained'
					startIcon={<AddCircleOutline />}
					sx={{ ml: 'auto', textTransform: 'capitalize' }}
					onClick={addOrderHandler}
				>Add Order</Button>

				<Menu
					open={filterOpen}
					anchorEl={filterAnchorEl}
					onClose={filterCloseHandler}
				>
					{filterButtons.map(({ label, name }, key) => <MenuItem key={key}
						onClick={(evt) => filterMenuItemHandler(evt, key, name)}
						selected={ selectedButton === key }
					>{label}</MenuItem> )}
				</Menu>
			</Paper>

			{/*--------[ Order Table Section ]--------*/}
			<Paper sx={{ py: 2, px: 1 }}>
				<Typography variant='h6' color='primary' paragraph >All Orders</Typography>

				<OrderTable />

				<Box sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					my: 2
				}}>
					<Autocomplete
						// options={['one', 'two', 'three']}
						options={[1, 2, 3]}
						getOptionLabel={option => `${option}`}
						renderInput={params => <TextField {...params}
							placeholder='Show : '
						/>}

						// sx={{ minWidth: 120 }}
					/>
					<Pagination
						count={3}
						shape='rounded'
						color='primary'

						page={page}
						onChange={(evt, newValue) => setPage(newValue)}
					/>
				</Box>
			</Paper>
		</>
	)
}
export default Orders
