import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectItem } from '../../store/dialogReducer'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import CallIcon from '@mui/icons-material/Call'



const navItems = [
	{label: 'Home', 		icon: <HomeIcon />, 	path: '/'},
	{label: 'About', 		icon: <PersonIcon />, path: '/about'},
	{label: 'Contact', 	icon: <CallIcon />, 	path: '/contact'},
]

const Header = () => {
	const router = useRouter()
	const dispatch = useDispatch()

	const [ open, setOpen ] = useState(false)
	const { selected } = useSelector(state => state.dialog)

	const clickHandler = () => setOpen(true)
	const closeHandler = () => setOpen(false)
	const listItemClickHandler = (path, key) => () => {
		closeHandler()
		dispatch(selectItem(key))
		router.push(path)
	}



	return (
		<>
			<Drawer open={open} onClose={closeHandler} >
				<List>
					{ navItems.map(({label, icon, path}, key) => (
						<ListItem key={key}
							// dense
							divider
							button
							selected={key === selected}
							onClick={listItemClickHandler(path, key)}
						>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText>{label}</ListItemText>
						</ListItem>
					))}
				</List>
			</Drawer>

			<Box sx={{display: { xs: 'block', sm: 'none' } }}>
				<IconButton color='inherit' onClick={clickHandler}>
					<MenuIcon fontStyle='inherit' />
				</IconButton>
			</Box>

			<Box sx={{display: { xs: 'none', sm: 'flex', gap: 20 } }}>
				{ navItems.map((nav, key) => (
					<Link key={key} href={nav.path} passHref>
						<MuiLink color='inherit' underline='none' >{nav.label}</MuiLink>
					</Link>
				))}
			</Box>
		</>
	)
}
export default Header
