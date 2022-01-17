import { useState } from 'react'
import Image from 'next/image'

import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'



const TopProducts = ({ title='', items=[], select=0, onClick=f=>f }) => {


	return (
		<>
			<Typography variant='h6' color='primary' >{title}</Typography>

			<List>
			{items.map(({avatar, title, subheader, price}, key) => (
				<ListItem key={key}
					divider
					selected={key === select}
					onClick={(evt) => onClick(evt, key)}
					secondaryAction={`$${price.toFixed(2)}`}>
					<ListItemAvatar>
						<Image src={avatar} width={50} height={50} />
					</ListItemAvatar>
					<ListItemText primary={title} secondary={subheader} />
				</ListItem>
			))}
			</List>
		</>
	)
}
export default TopProducts
