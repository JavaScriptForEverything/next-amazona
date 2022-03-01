import { useState } from 'react'

import SearchComponent from '../dashboard/_search'

import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import InfoIcon from '@mui/icons-material/Info'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const searchBarCategories = [
	{ label: 'Product Name' ,icon: <PersonIcon />, name: 'name', 		value: 'shipping.username' },
	{ label: 'Date', 	icon: <EmailIcon />, 			name: 'email', 		value: 'shipping.email' },
	{ label: 'Brand', icon: <InfoIcon />, 			name: 'address', 	value: 'shipping.address' },
	{ label: 'Price', icon: <AttachMoneyIcon />,name: 'currency', value: 'payment.currency' },
	{ label: 'Category', icon: <AttachMoneyIcon />,name: 'currency', value: 'payment.currency' },
]

const Search = () => {
	const [ searchValue, setSearchValue ] = useState('')
	const [ category, setCategory ] = useState(searchBarCategories[0])

	const searchChangeHandler = (evt) => setSearchValue(evt.target.value)
	const searchBarSubmitHandler = (evt) => {
		evt.preventDefault()

		console.log({ searchValue, category: category.value })

		// token && dispatch(getOrders(token, { page, limit, search: [category.value, searchValue] }))
	}

	return (
		<SearchComponent
			value={searchValue}
			onChange={searchChangeHandler}

			keywords={searchBarCategories} 	// used to be search on it
			keyword={category.name}
			setKeyword={setCategory}

			onSubmit={searchBarSubmitHandler}
		/>
	)
}
export default Search
