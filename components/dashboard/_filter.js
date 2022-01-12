import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import FilterIcon from '@mui/icons-material/FilterAltOutlined'
import AddIcon from '@mui/icons-material/AddCircleOutline'

const FilterComponent = ({ items=[], filterHandler=f=>f, addLabel='Add', addHandler=f=>f }) => {
	const [ open, setOpen ] = useState(false)
	const [ anchorEl, setAnchorEl ] = useState(null)
	const [ selected, setSelected ] = useState(0)


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

		filterHandler(evt, key, item)
	}
	const addButtonHandler = (evt) => addHandler(evt)

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
				{icon ? (
					<>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText>{label}</ListItemText>
					</>
					) : label }
				</MenuItem>)}
			</Menu>

			{/* show on sm-md */}
			<Box item sm={12} sx={{display: {xs: 'none', sm: 'flex', gap: 8} }}>
				{items.map(({label, icon, name}, key) => <Button key={key}
					variant={selected === key ? 'contained' : 'outlined'}
					startIcon={<FilterIcon />}
					onClick={evt => menuItemHandler(evt, key, name)}
					sx={{ textTransform: 'capitalize' }}
				>{label}</Button>)}
			</Box>

			<Button
				variant='contained'
				onClick={addButtonHandler}
				startIcon={<AddIcon />}
				sx={{ textTransform: 'capitalize' }}
			>{addLabel}</Button>

		</Box>
	)
}

export default FilterComponent
