import { useState } from 'react'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'



const SearchBar = (props) => {
	const {
		placeholder='Search for ...',
		dataList=[],
		value='',
		onChange=f=>f,
		category={},
		setCategory=f=>f,
		submitHandler=f=>f

	} = props

	const [ open, setOpen ] = useState(false)
	const [ anchorEl, setAnchorEl ] = useState(null)


	const openMenuCloseHandler = () => {
		setOpen(false)
		setAnchorEl(null)
	}
	const searchCategoryItemClickHandler = (evt, newValue) => {
		openMenuCloseHandler() 		// to close menu
		setCategory(newValue)
	}

	const iconButtonClickHandler = (evt) => {
		setAnchorEl(evt.target)
		setOpen(true)
	}


	return (
			<>
			<Menu
				open={open}
				anchorEl={anchorEl}
				onClose={openMenuCloseHandler}
				transformOrigin={{horizontal: 'right', vertical: 'center'}}
			>
				{ dataList.map( (category, key) => <MenuItem key={key}
					onClick={evt => searchCategoryItemClickHandler(evt, category)}
					>{category.label}</MenuItem> )}
			</Menu>

			<form onSubmit={submitHandler}>
				<TextField
					type='search'
					placeholder={placeholder}
					margin='dense'
					value={value}
					onChange={onChange}
					InputProps={{
						startAdornment: <InputAdornment position='start'><SearchIcon /></InputAdornment>,
						endAdornment: (
						<InputAdornment position='end'>
							{category.label}
							<IconButton onClick={iconButtonClickHandler}>
								<ArrowDropDownIcon />
							</IconButton>
						</InputAdornment>),
					}}

				/>
			</form>

		</>
	)
}
export default SearchBar


