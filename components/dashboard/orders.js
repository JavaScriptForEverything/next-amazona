import nookies from 'nookies'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../store/paymentReducer'

import { idFormatter, priceFormatter } from '../../util'
import SearchComponent from './_search'
import FilterComponent from './_filter'
import OrderTable from './order/table'
import CreateComponent from './order/create'

import Box from '@mui/material/Box'
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
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import InfoIcon from '@mui/icons-material/Info'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CategoryIcon from '@mui/icons-material/Category'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'


const menuItemsForFilter = [
	{ label: 'Date', 		 icon: <AccessTimeIcon />,	name: 'createdAt' },
	{ label: 'Category', icon: <CategoryIcon />, 		name: 'category' },
	{ label: 'Status', 	 icon: <DataUsageIcon />, 	name: 'status' },
	{ label: 'Price', 	 icon: <AttachMoneyIcon />,	name: 'price' },
]
const searchBarCategories = [
	{ label: 'Username',icon: <PersonIcon />, 		name: 'username', value: 'shipping.username' },
	{ label: 'Email', 	icon: <EmailIcon />, 			name: 'email', 		value: 'shipping.email' },
	{ label: 'Address', icon: <InfoIcon />, 			name: 'address', 	value: 'shipping.address' },
	{ label: 'Currency',icon: <AttachMoneyIcon />,name: 'currency', value: 'payment.currency' },
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

	// const tableHead = ['Order ID', 'Date', 'Name', 'Email', 'Price', 'Status', 'Actions']
	// const tableData = users.map(order => ({
	// 	name: order.username,
	// 	avatar: order.avatar.secure_url,
	// 	_id: order._id, 													// original id required for CRUD operation
	// 	id: idFormatter(order._id), 							// shorted id for designing
	// 	price: priceFormatter(order.price || 32),
	// 	date: new Date(order.createdAt).toLocaleDateString(),
	// 	email: order.email,
	// 	phone: order.phone,
	// 	status: order.active
	// }))

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


	if(!view) return <CreateComponent setView={setView} />

	return (
		<>
			<Box sx={{ mb: 2 }}>
				<SearchComponent
					value={searchValue}
					onChange={searchChangeHandler}

					keywords={searchBarCategories} 	// used to be search on it
					keyword={category.name}
					setKeyword={setCategory}

					onSubmit={searchBarSubmitHandler}
				/>
			</Box>


			{/*--------[ Filter Section ]--------*/}
			<Paper sx={{ mb: 2 }}>
				<FilterComponent
					addLabel='Add Order'
					items={menuItemsForFilter}
					filterHandler={filterMenuItemHandler}
					addHandler={addOrderHandler}
				/>
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

{/*			<Paper sx={{ mb: 2 }}>
				<TableComponent
					title='All Orders'
					headers={tableHead}
					data={tableData} 		// to make table re-usable, only send required fields instead of full users
					countPage={countPage}

					itemHandler={tableItemHandler}
					limitHandler={tableLimitHandler}
					pageHandler={tablePageHandler}
				/>
			</Paper>
*/}

		</>
	)
}
export default Orders
