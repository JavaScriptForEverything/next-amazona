import { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const SearchComponent = (props) => {
	const {
		placeholder='Searcing for ...',
		value='',

		/* [{ label: 'Date', name: 'createdAt', value: 'customer.createdAt'}, ...]
		* 	label : used to show friendly Text as MenuItem popup on click to select search category item
		* 	icon 	: also used with MenuItem (optional)
		* 	name 	: used to show as selected category + also used as [key] to search on it.
		* 	value	: used as the selected category's value .find({key: value}) */
		keywords=[],
		keyword='',
		setKeyword=f=>f,

		onChange=f=>f,
		onSubmit=f=>f,
		sx={}
	} = props

	const [ open, setOpen ] = useState(false)
	const [ anchorEl, setAnchorEl ] = useState(null)

	const iconButtonClickHandler = (evt) => {
		setAnchorEl(evt.target)
		setOpen(true)
	}
	const menuCloseHandler = () => {
		setAnchorEl(null)
		setOpen(false)
	}
	const menuItemHandler = (evt, item) => {
		menuCloseHandler()
		setKeyword(item)
	}

	return (
		<Box sx={sx}>
			<form onSubmit={onSubmit} >
				<TextField
					type='search'
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					autoFocus

					InputProps={{
						startAdornment: <InputAdornment position='start'><SearchIcon /></InputAdornment>,
						endAdornment: <InputAdornment position='end'>
							<Typography onClick={iconButtonClickHandler}> {keyword} </Typography>
							<IconButton onClick={iconButtonClickHandler}> <ArrowDropDownIcon /> </IconButton>
						</InputAdornment>,
					}}
				/>

				<Menu open={open} anchorEl={anchorEl} onClose={menuCloseHandler} >
					{keywords.map((item, key) => <MenuItem key={key}
						onClick={(evt) => menuItemHandler(evt, item)} >
						{item.icon ? (<>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText>{item.label}</ListItemText>
						</>) : item.label }
					</MenuItem>)}
				</Menu>
			</form>
		</Box>
	)
}
export default SearchComponent
