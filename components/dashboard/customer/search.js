import { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
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
		setValue=f=>f,
		onChange=f=>f,
		onSubmit=f=>f,
		keywords=[]
	} = props

	const [ open, setOpen ] = useState(false)
	const [ anchorEl, setAnchorEl ] = useState(null)
	const [ keyword, setKeyword ] = useState('username')

	const iconButtonClickHandler = (evt) => {
		setAnchorEl(evt.target)
		setOpen(true)
	}
	const menuCloseHandler = () => {
		setAnchorEl(null)
		setOpen(false)
	}
	const menuItemHandler = (evt, label, name) => {
		menuCloseHandler()
		setKeyword(name)
	}

	return (
		<form onSubmit={onSubmit}>
			<TextField
				type='search'
				placeholder={placeholder}
				onChange={onChange}
				value={value}

				InputProps={{
					startAdornment: <InputAdornment position='start'><SearchIcon /></InputAdornment>,
					endAdornment: <InputAdornment position='end'>
						{keyword}
						<IconButton onClick={iconButtonClickHandler}>
							<ArrowDropDownIcon />
						</IconButton>
					</InputAdornment>,
				}}
			/>

			<Menu
				open={open}
				anchorEl={anchorEl}
				onClose={menuCloseHandler}
			>
				{keywords.map(({label, icon, name}, key) => <MenuItem key={key}
					onClick={(evt) => menuItemHandler(evt, label, name)}
				>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText>{label}</ListItemText>
				</MenuItem>
				)}
			</Menu>
		</form>
	)
}
export default SearchComponent
