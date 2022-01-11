import nookies from 'nookies'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../store/paymentReducer'

import SearchBar from './order/searchBar'
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
	{ label: 'Date', name: 'createdAt' },
	{ label: 'Category', name: 'category' },
	{ label: 'Status', name: 'status' },
	{ label: 'Price', name: 'price' },
]


const searchBarCategories = [
	{ label: 'Username', value: 'shipping.username' },
	{ label: 'Email', 	value: 'shipping.email' },
	{ label: 'Address', value: 'shipping.address' },
	{ label: 'Currency', 	value: 'payment.currency' },
	// { label: 'Phone', 	value: 'shipping.phone' },
	// { label: 'Price', 	value: 'payment.amount' }, 							// Regular Expression can't search by number, must be string text
]


const { token } = nookies.get(null)
const tableLimitOptions = [...Array(10)].map((item, index) => index + 1)

const Orders = () => {
	const [ view, setView ] = useState(true) 												// for Design

	const dispatch = useDispatch()

	const [ searchValue, setSearchValue ] = useState('')
	const [ category, setCategory ] = useState(searchBarCategories[0])

	const [ selectedButton, setSelectedButton ] = useState(0) 			// select 1st button
	const [ page, setPage ] = useState(1) 													// page 	= 1
	const [ limit, setLimit ] = useState(tableLimitOptions[1])  		// limit 	= 2

	const [ filterOpen, setFilterOpen ] = useState(false)
	const [ filterAnchorEl, setFilterAnchorEl ] = useState(null)

	// save orders into store
	useEffect(() => {
		token && dispatch(getOrders(token, { page, limit }))
	}, [page, limit])

	// get oders from store
	const { error, loading, orders, countPage } = useSelector(state => state.payment)


	const searchChangeHandler = (evt) => setSearchValue(evt.target.value)
	const searchBarSubmitHandler = (evt) => {
		evt.preventDefault()

		token && dispatch(getOrders(token, { page, limit, search: [category.value, searchValue] }))
	}

	const filterCloseHandler = () => {
		setFilterOpen(false)
		setFilterAnchorEl(null)
	}
	const filterButtonHandler = (evt) => {
		setFilterAnchorEl(evt.target)
		setFilterOpen(true)
	}

	const filterMenuItemHandler = (evt, key, fieldName) => {
		filterCloseHandler()
		setSelectedButton(key)

		// only handled date, for other value, have to modify little bit
		token && dispatch(getOrders(token, { page, limit, sort: `-${fieldName}` }))
		// console.log(fieldName)
	}

	const limitTableItems = (evt, newLimit) => {
		setLimit(newLimit)
	}

	const addOrderHandler = () => {
		// let message = 'Open a Dialog | redirect to order page: order page shows 2 things: \n\n'
		// 		message += '\t1.show orders,\n'
		// 		message += '\t2. add order\n'
		// console.log(message)

		setView(false)
	}


	if(!view) return <Button variant='outlined' onClick={() => setView(true)}>Done</Button>

	return (
		<>
			<Grid container>
				<Grid item xs={12} sm={6} >
					<SearchBar
						placeholder='Search for Orders'
						dataList={searchBarCategories}
						value={searchValue}
						onChange={searchChangeHandler}
						category={category}
						setCategory={setCategory}
						submitHandler={searchBarSubmitHandler}
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

				<OrderTable orders={orders} />

				<Box sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					my: 2
				}}>
					<Autocomplete
						// options={[...Array(10)].map((item, index) => index + 1)}
						options={tableLimitOptions}
						getOptionLabel={option => `${option}`}
						renderInput={params => <TextField {...params}
							placeholder='Show : '
						/>}

						value={limit}
						onChange={limitTableItems}
						// sx={{ minWidth: 120 }}
					/>

					{countPage && countPage != 1 && <Pagination
						count={countPage}
						boundaryCount={0}
						siblingCount={1}

						shape='rounded'
						color='primary'

						hidePrevButton
						hideNextButton
						page={page}
						onChange={(evt, newValue) => setPage(newValue)}
					/>}
				</Box>
			</Paper>
		</>
	)
}
export default Orders
