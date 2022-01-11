import nookies from 'nookies'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../../store/userReducer'

import SearchComponent from './search'
import FilterComponent from './filter'
import TableComponent from './table'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CategoryIcon from '@mui/icons-material/Category'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const menuItemsForFilter = [
	{ label: 'Date', 		 icon: <AccessTimeIcon /> ,name: 'createdAt' },
	{ label: 'Category', icon: <CategoryIcon /> ,name: 'category' },
	{ label: 'Status', 	 icon: <DataUsageIcon /> ,name: 'status' },
	{ label: 'Price', 	 icon: <AttachMoneyIcon /> ,name: 'price' },
]

const headers = [
	'Customer Name', 		// avatar + name
	'# ID',
	'Spent', 						// total proce of customer
	'Last Order', 			// last transaction time
	'Email',
	'Phone',
	'Status', 						// active | inactive 	=> active=true,
	'Actions'
]
// const users = [{
// 	"avatar" : {"secure_url" : "https://res.cloudinary.com/javascriptforeverything/image/upload/v1639807039/next-amazona/users/pgwuurbj1ml642thlbng.jpg"},
// 	"username" : "riajul islam",
// 	"_id" : ("61bb44660967c37ff51ba1b9"),
// 	"createdAt" : ("2021-12-18T05:57:10.900Z"), 		// we will get from vritual populate
// 	"email" : "abc@gmail.com",
// 	"phone" : "01957500605",
// 	"active": true,
// }]



const ViewComponent = () => {
	const dispatch = useDispatch()

	const [ searchValue, setSearchValue ] = useState('')

	const { token } = nookies.get(null)
	const { error, loading, users, countPage } = useSelector(state => state.user)


	useEffect(() => {
		dispatch(getAllUsers(token))
	}, [token])


	const searchChangeHandler = (evt) => {
		setSearchValue(evt.target.value)
	}
	const searchSubmitHandler = (evt) => {
		evt.preventDefault()

		console.log({ searchValue })
	}



	return (
		<>
			<Box sx={{ mb: 2 }}>
				<SearchComponent
					value={searchValue}
					setValue={setSearchValue}
					keywords={menuItemsForFilter} 	// used to be search on it
					onChange={searchChangeHandler}
					onSubmit={searchSubmitHandler}
				/>
			</Box>

			<Paper sx={{ mb: 2 }}>
				<FilterComponent items={menuItemsForFilter} />
			</Paper>

			<Paper sx={{ mb: 2 }}>
				<TableComponent
					title='All Customers'
					headers={headers}
					users={users} 		// to make table re-usable, only send required fields instead of full users
					countPage={countPage}
				/>
			</Paper>

		</>
	)
}
export default ViewComponent
