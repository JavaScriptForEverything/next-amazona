import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../store/productReducer'
import { showAlert } from '../../store/dialogReducer'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'


const AddToCart = ({ ...params}) => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState(1)
	const [ disabled, setDisabled ] = useState(false)
	const { cartItems, product } = useSelector(state => state.product)

	console.log(cartItems)

	useEffect(() => {
		const	itemFound = cartItems.some(item => item._id === product._id )
		if(itemFound) setDisabled(true)
	}, [])

	const increaseValueHandler = () => {
		if(value >= 5) return
		setValue(value + 1)
	}

	const decreaseValueHandler = () => {
		if(value <= 1) return
		setValue(value - 1)
	}

	const addToCartHandler = (evt) => {
		dispatch(addItemToCart(product))
		setDisabled(true)
	}

	return (
		<Box {...params}>
			<Box component='section' sx={{display: 'flex', gap: 3 }}>
				<Box component='article' sx={{ display: 'flex', gap: 1, alignItems: 'center'}}>
					<IconButton color='success' onClick={increaseValueHandler}> <AddIcon /> </IconButton>
					<Typography>{value}</Typography>
					<IconButton color='error' onClick={decreaseValueHandler}> <RemoveIcon /> </IconButton>
				</Box>

				<Button
					variant='contained'
					sx={{ textTransform: 'capitalize' }}
					onClick={addToCartHandler}
					disabled={disabled}
				>
				{disabled ? 'added to cart' : 'Add To Cart'}
				</Button>
			</Box>
		</Box>
	)
}
export default AddToCart
