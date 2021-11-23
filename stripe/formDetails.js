import { useSelector } from 'react-redux'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
// import ListSubheader from '@mui/material/ListSubheader'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'



const Details = () => {
	const shippingCharge = 0
	const { cartItems: tours } = useSelector(state => state.dialog )

	return (
		<>
			<Tabs value={0} onChange={f=>f} sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tab label='Tour Details' />
			</Tabs>
			<List>
				{tours?.map((tour, index) => (
					<ListItem key={tour._id}>
						<ListItemText
							// primary={tour.name}
							primary={`${tour.name} [${tour.brand}]`}
							secondary={tour.summary}
						/>
						<ListItemIcon> {tour.quantity} 	x  {tour.price.toFixed(2)} </ListItemIcon>

					</ListItem>
				))}

				<ListItem>
					<ListItemText primary='Shipping'/>
					<ListItemIcon> $ {shippingCharge.toFixed(2)} </ListItemIcon>
				</ListItem>

				<Divider sx={{ mt: 1 }} />
				<ListItem>
					<ListItemText primary='Total' />
					<ListItemIcon>
						$ {tours?.reduce((total, tour) => total + tour.price*tour.quantity, shippingCharge).toFixed(2) }
					</ListItemIcon>
				</ListItem>
			</List>
		</>
	)
}
export default Details
