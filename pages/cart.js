import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeItemFromCart, updateCartItem } from '../store/dialogReducer'

import Image from 'next/image'
import Link from 'next/link'

import Layout from '../layout'

import Grid from '@mui/material/Grid'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'

import NoSsr from '@mui/material/NoSsr'

const Cart = () => {
	const dispatch = useDispatch()
	const { cartItems } = useSelector(state => state.dialog)

	const clickHandler = (evt, cart) => dispatch(removeItemFromCart(cart))

	const addHandler = (evt, cart) => {
		if(cart.quantity >= cart.inStock) return
			dispatch(updateCartItem(cart, true))
	}
	const removeHandler = (evt, cart) => {
		if(cart.quantity <= 1 ) return
			dispatch(updateCartItem(cart, false))
	}

	return (
		<Layout title='Shopping Cart'>
			<NoSsr>
				<Typography>Cart Page</Typography>

				<Grid container spacing={2} >
					<Grid item xs={12} md={9} >
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Image</TableCell>
										<TableCell>Name</TableCell>
										<TableCell align='center' colSpan={2}>quantity</TableCell>
										<TableCell></TableCell>
										<TableCell align='right'>price</TableCell>
										<TableCell align='right'>action</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
								{cartItems.map(cart => (
									<TableRow key={cart._id}>
										<TableCell>
											<Image src={cart.image} alt={cart.slug} width={50} height={50} />
										</TableCell>
										<TableCell>
											<Link href={`/product/${cart.slug}`} passHref >
												<MuiLink>{cart.name}</MuiLink>
											</Link>
										</TableCell>
										<TableCell align='center' colSpan={2}>
											<IconButton onClick={(evt) => removeHandler(evt, cart)}><RemoveIcon color='error' /></IconButton>
												<Typography component='span' sx={{mx:1}} >{cart.quantity}</Typography>
											<IconButton onClick={(evt) => addHandler(evt, cart)}><AddIcon color='primary' /></IconButton>
										</TableCell>
										<TableCell></TableCell>
										<TableCell align='right'>${cart.price}</TableCell>
										<TableCell align='right'>
											<IconButton onClick={(evt) => clickHandler(evt, cart)}>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={12} md={3} >
						<Paper>
							<List>
								<ListItem>
									<Typography variant='h5'> Subtotal
										({cartItems.reduce((total, item, index) => total + index, 1)} items):
										${cartItems.reduce((total, item, index) => total + item.price * item.quantity, 0)}
									</Typography>
								</ListItem>
								<ListItem>
									<Button variant='contained' fullWidth >Check Out</Button>
								</ListItem>
							</List>
						</Paper>
					</Grid>
				</Grid>
			</NoSsr>

		</Layout>
	)
}
export default Cart
