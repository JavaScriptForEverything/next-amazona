import nookies from 'nookies'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import Layout from '../../layout'
import Dashboard from '../../components/dashboard/dashboard'
import Products from '../../components/dashboard/products'
import Orders from '../../components/dashboard/orders'
import Customers from '../../components/dashboard/customers'
import Settings from '../../components/dashboard/settings'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
// import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'


const leftPanelItems = [
	{ label: 'Dashboard', component: <Dashboard />, icon: <DashboardIcon />},
	{ label: 'Products', 	component: <Products />, 	icon: <ShoppingBagIcon />},
	{ label: 'Orders', 		component: <Orders />, 		icon: <ListAltIcon />},
	{ label: 'Customers', component: <Customers />, icon: <PeopleIcon />},
	{ label: 'Settings', 	component: <Settings />, 	icon: <SettingsIcon />},
]


const DashboardComponent = () => {
	const [ selected, setSelected ] = useState(4)
	const { user } = useSelector(state => state.user)

	// console.log(selected)
	const navItemClickHandler = (evt) => setSelected(+evt.currentTarget.dataset.listValue)


	return (
		<Layout title={`Dashboard of '${user.username}'`} >


			<Grid container spacing={2}>
			{/*-------[ left side panel ]-------*/}
				<Grid item xs={3}>
					<Paper sx={{ py: 1 }}>
						<List sx={{ mx: { xs: 2, sm: 0 } }}>
						{leftPanelItems.map((nav, key, arr) => (
							<ListItem key={nav.label} button
								// dense
								divider={ key !== arr.length - 1 }
								onClick={navItemClickHandler}
								data-list-value={key}
								selected={key === selected}
							>
								<ListItemIcon title={nav.label}>{nav.icon}</ListItemIcon>
								<ListItemText sx={{ display: {xs: 'none', sm: 'block'} }} primary={nav.label} />
							</ListItem>
						))}
						</List>
					</Paper>
				</Grid>

			{/*-------[ Right side panel ]-------*/}
				<Grid item xs={9}>
						{leftPanelItems.map((item, key, arr) => (
							<Box key={item.label} >
								{ key === selected && item.component }
							</Box>
						))}
				</Grid>
			</Grid>

		</Layout>
	)
}
export default DashboardComponent


export const getServerSideProps = (ctx) => {
	const { token } = nookies.get(ctx)

	if(!token) return { redirect: { 		// NextJS built-in Redirect features
			destination: '/login',
			parmanent: false
		}
	}

	return { props: {} }
}


