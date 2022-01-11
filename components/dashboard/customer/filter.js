import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { enableView } from '../../../store/dialogReducer'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import FilterIcon from '@mui/icons-material/FilterAltOutlined'
import AddIcon from '@mui/icons-material/AddCircleOutline'

const FilterComponent = ({ items }) => {
	const dispatch = useDispatch()
	const [ open, setOpen ] = useState(false)
	const [ anchorEl, setAnchorEl ] = useState(null)
	const [ selected, setSelected ] = useState(0)

	const addClickHandler = () => {
		dispatch(enableView(false))
	}

	const menuCloseHandler = () => {
		setOpen(false)
		setAnchorEl(null)
	}
	const filterButtonHandler = (evt) => {
		setAnchorEl(evt.target)
		setOpen(true)
	}
	const menuItemHandler = (evt, key, item) => {
		menuCloseHandler()
		setSelected(key)
		console.log(item)
	}
	const buttonHandler = (evt, key, item) => {
		setSelected(key)
	}

		// console.log(selected)

	return (
		<Box sx={{display: 'flex', justifyContent: 'space-between', p: 1}}>

			{/* show on xs */}
			<Box item xs={12} sx={{display: {xs: 'block', sm: 'none'} }}>
				<Button
					variant={open ? 'contained' : 'outlined'}
					startIcon={<FilterIcon />}
					onClick={filterButtonHandler}
				>Filter</Button>
			</Box>
			<Menu
				open={open}
				anchorEl={anchorEl}
				onClose={menuCloseHandler}
			>
				{items.map(({label, name, icon}, key) => <MenuItem key ={key}
					dense
					divider
					selected={selected === key}
					onClick={(evt) => menuItemHandler(evt, key, name)}
				>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText>{label}</ListItemText>
				</MenuItem>)}
			</Menu>

			{/* show on sm-md */}
			<Box item sm={12} sx={{display: {xs: 'none', sm: 'flex', gap: 8} }}>
				{items.map(({label, icon, name}, key) => <Button key={key}
					variant={selected === key ? 'contained' : 'outlined'}
					startIcon={<FilterIcon />}
					onClick={evt => buttonHandler(evt, key, name)}
				>{label}</Button>)}
			</Box>

			<Button
				variant='contained'
				onClick={addClickHandler}
				startIcon={<AddIcon />}
			>Add Order</Button>

		</Box>
	)
}

export default FilterComponent
