import { useState } from 'react'
import Image from 'next/image'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'



const TopProducts = ({ title='', items=[], select=0, onClick=f=>f }) => {

	const buttonClickHandler = () => console.log('See All')

	return (
		<>
			<Box sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}>
				<Typography variant='h6' color='primary' >{title}</Typography>
				<Button sx={{textTransform: 'capitalize'}} onClick={buttonClickHandler}>See All</Button>
			</Box>

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
