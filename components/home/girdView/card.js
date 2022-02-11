import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { shorter } from '../../../util'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Badge from '@mui/material/Badge'
import Rating from '@mui/material/Rating'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const menuItems = [
	{ label: 'Edit', icon: <EditIcon />, path: '/' },
	{ label: 'Delete', icon: <DeleteIcon />, path: '/' },
]

const CardComponent = ({ product }) => {
	const router = useRouter()
	const [ open, setOpen ] = useState(false)
	const [ anchorEl, setAnchorEl ] = useState(null)
	const [ itemId, setItemId ] = useState('')

	const actionHandler = (id) => (evt) => {
		setAnchorEl(evt.currentTarget)
		setOpen(true)
		setItemId(id)
	}

	const closeHandler = () => {
		setOpen(false)
		setAnchorEl(null)
	}
	const menuItemHandler = () => {
		closeHandler()

		console.log({itemId})
	}


	return (
		<>
		<Menu
			open={open}
			anchorEl={anchorEl}
			onClose={closeHandler}
		>
		{menuItems.map(({ label, icon, path}, key) => (
			<MenuItem key={key} onClick={menuItemHandler} dense divider>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText>{label}</ListItemText>
			</MenuItem>
		))}
		</Menu>

		<Card>
			<CardHeader
				title={product.name}
				action={<IconButton onClick={actionHandler(product._id)}><MoreVertIcon /></IconButton>}
			/>
			<Link href={`/product/${product.slug}`} passHref>
				<CardActionArea sx={{position: 'relative'}}>
					<CardMedia
						component='img'
						src={product.coverImage?.secure_url || '/images/coverImage.jpg'}
						height={150}
					/>
					<Badge color='error'badgeContent='New'sx={{position: 'absolute', top: 20, left: 30, }} />
				</CardActionArea>
			</Link>

			<CardContent>
				<Typography color='textSecondary' align='justify' paragraph>{shorter(product.description, 100)}</Typography>
				<Box sx={{display: 'flex', gap: 2, alignItems: 'center', }}>
					<Typography>
						<Rating size='small' name='product rating' defaultValue={product.ratings} precision={.5} readOnly />
					</Typography>
					<Typography color='primary'> {product.ratings || 4}/5 </Typography>
				</Box>
				<Typography variant='h6' sx={{ my: 3 }} >${product.price.toFixed(2)}</Typography>
			</CardContent>

{/*									<CardActions>
				<Button variant='contained'fullWidth onClick={(evt) => addToCartHandler(evt, product)} >Add To Cart</Button>
			</CardActions>
*/}
			<CardActions sx={{display: 'flex', justifyContent: 'flex-end', my: 1 }} >
				<Button onClick={() => router.push(`/product/${product.slug}`)} variant='contained'>Details</Button>
			</CardActions>
		</Card>
		</>
	)
}
export default CardComponent
