import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../store/productReducer'

import SearchComponent from './_search'
import FilterComponent from './_filter'
import TableComponent from './product/table'
import CreateComponent from './product/create'

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

const Products = () => {
	const [ view, setView ] = useState(true)
	const dispatch = useDispatch()

	const [ searchValue, setSearchValue ] = useState('')
	const [ keyword, setKeyword ] = useState(menuItemsForFilter[0])

	const { error, loading, products, countPage } = useSelector(state => state.product )

	useEffect(() => {
		dispatch(getAllProducts())
	}, [])


	const addHandler = (evt) => setView(false) 		// to handle 2 page: create.js product

	// searchComponent handling
	const searchChangeHandler = (evt) => setSearchValue(evt.target.value)
	const searchSubmitHandler = (evt) => {
		evt.preventDefault()
		if(!searchValue.trim()) return

		console.log({ searchValue, keyword  })
	}

	// filterComponent handling
	const filterButtonClickHandler = (evt, key, item) => {

		console.log({ key, item })
	}

	// tableComponent handling
	const tableItemHandler = (evt, productId) => {

		console.log({ productId })
	}
	const tableLimitHandler = (evt, limit) => {

		console.log({ limit })
	}
	const tablePageHandler = (evt, page) => {

		console.log({ page })
	}


	if(!view) return <CreateComponent setView={setView} />

	return (
		<>
			<Box sx={{ mb: 2 }}>
				<SearchComponent
					value={searchValue}
					onChange={searchChangeHandler}

					keywords={menuItemsForFilter} 	// used to be search on it
					keyword={keyword.name}
					setKeyword={setKeyword}

					onSubmit={searchSubmitHandler}
				/>
			</Box>

			<Paper sx={{ mb: 2 }}>
				<FilterComponent
					addLabel='Add Product'
					items={menuItemsForFilter}
					filterHandler={filterButtonClickHandler}
					addHandler={addHandler}
				/>
			</Paper>

			<Paper sx={{ mb: 2 }}>
				<TableComponent
					title='All Products'
					countPage={countPage}
					itemHandler={tableItemHandler}
					limitHandler={tableLimitHandler}
					pageHandler={tablePageHandler}

					data={products} 		// to make table re-usable, only send required fields instead of full users
				/>
			</Paper>
		</>
	)
}
export default Products
