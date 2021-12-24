import { useState, useEffect } from 'react'
import nookies from 'nookies'
import absoluteUrl from 'next-absolute-url'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../store/dialogReducer'
import { addItemToCart } from '../store/productReducer'
import { filterPush, shorter } from '../util'

import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from '../layout'
import Header from '../components/home/header.js'


import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Slider from '@mui/material/Slider'
import Badge from '@mui/material/Badge'
import Rating from '@mui/material/Rating'
import Pagination from '@mui/material/Pagination'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ListIcon from '@mui/icons-material/List'
import GridViewIcon from '@mui/icons-material/GridView'
import SearchIcon from '@mui/icons-material/Search'

const filterByOptions = ['Latest Items', 'Most Popular', 'Trending', 'Chepest']
const sliderInputs = [
	{ label: '$0', 		name: 'min' },
	{ label: '$100', 	name: 'max' },
]
const sliderInputsObj = {}
sliderInputs.forEach((item, index) => sliderInputsObj[item.name] = index * 100 )

const groupButtons = [
	{ icon: <ListIcon />, 		title: 'List View' },
	{ icon: <GridViewIcon />,	title: 'Grid View' },
]



const Home = ({ products }) => {
	const dispatch = useDispatch()
	const router = useRouter()

	const [ view, setView ] = useState(1) 																// filter-ButtonGroup
	const [ inputSearchValue, setInputSearchValue ] = useState('') 				// filter-search
	const [ checkboxes, setCheckboxes ] = useState([]) 										// filter-checkbox
	const [ sliderValue, setSliderValue ] = useState([0, 100]) 						// filter-slider
	const [ sliderFields, setSliderFields ] = useState(sliderInputsObj)
	const [ filterBy, setFilterBy ] = useState(filterByOptions[0]) 				// filter-Autocomplete

	const [ page, setPage ] = useState(1) 																// bottom page nagivation

	const { error, cartItems } = useSelector(state => state.product)


	// Make view parmanent
	useEffect(() => { // convert to number and only 1 if not zeor|false
		const currentView = +localStorage.getItem('view')	?? 1
		setView(currentView)
	}, [view])



	const brands = [ 										// this values froms from redux store
		{ name: 'adidas', 	value: 42},
		{ name: 'niki', 		value: 24},
		{ name: 'oliver', 	value: 26},
		{ name: 'zara', 		value: 42},
		{ name: 'ramond', 	value: 42},
	]

	// view handler
	const groupButtonsHandler = (evt, id) => {
		setView(id)
		localStorage.setItem('view', id)
	}
	const addToCartHandler = (evt, product) => {
		const isFound = cartItems.find(cart => cart._id === product._id)
		if(isFound) return dispatch(showAlert({ open: true, severity: 'info', message: 'This product all ready added into cart'}))

		dispatch(addItemToCart(product))
		dispatch(showAlert({ open: true, severity: 'success', message: 'added to cart'}))
	}


	const checkboxOnChangeHandler = (evt, checkedId, brand) => {
		setCheckboxes( checkboxes.map((checkbox, key, arr) => key === checkedId ? [...arr, !checkbox] : [...arr] ))
		// router.push(`?brand=${brand}`)
	}


	const inputSearchHandler = (evt) => setInputSearchValue(evt.target.value)
	const inputSearchSubmitHandler = (evt) => {
		evt.preventDefault()

		filterPush(router, 'search', inputSearchValue)
	}


	const sliderOnChangeHandler = (evt, newValue) => setSliderValue(newValue)
	const sliderInputHandler = (evt, name) => setSliderFields({ ...sliderFields, [name]: evt.target.value })
	const sliderSubmitHandler = (evt) => {
		evt.preventDefault()

		const currentValue = sliderValue.map(item => item * (sliderFields.max - sliderFields.min))

		filterPush(router, 'price', currentValue)
	}

	const filterSizeClickHandler = (evt, item) => {
		filterPush(router, 'size', item)
	}

	const ratingsClickHandler = (evt, ratings) => {
		filterPush(router, 'ratings', ratings)
	}




	const filterByChangeHandler = (evt, newValue) => {
		setFilterBy(newValue)
		filterPush(router, 'common', newValue)
	}

	const pageHandler = (evt, newValue) => {
		setPage(newValue)

		filterPush(router, 'page', newValue)
	}



	return (
		<Layout>
			<Header />
			<Grid container spacing={2} sx={{ my: 2 }} >
				{/*-------[ Left Side ]--------*/}
				<Grid item xs={12} md={3}>
					<Paper>
						<Accordion defaultExpanded={false}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography color='primary'> Product Type </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<form noValidate onSubmit={inputSearchSubmitHandler}>
									<TextField
										placeholder='Searcing...'
										fullWidth
										autoFocus
										margin='dense'
										InputProps={{
											endAdornment: <InputAdornment position='end'>
												<IconButton onClick={inputSearchSubmitHandler}> <SearchIcon color='primary' /> </IconButton>
											</InputAdornment>
										}}
										onChange={inputSearchHandler}
										value={inputSearchValue}
									/>
								</form>

							</AccordionDetails>
						</Accordion>

						<Divider />

						<Accordion defaultExpanded={false}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography color='primary'> Ratings</Typography>
							</AccordionSummary>
							<AccordionDetails>
									{products.map((product, key) => <ListItem key={key}
										sx={{cursor: 'pointer'}}
										onClick={evt => ratingsClickHandler(evt, product.ratings)}
									>
										<Rating
											size='small'
											name='product rating'
											defaultValue={product.ratings}
											precision={.2}
											readOnly
										/>
									</ListItem> )}
							</AccordionDetails>
						</Accordion>

						<Divider />

						<Accordion defaultExpanded={false}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography color='primary'> Brands </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<List >
									{brands.map((brand, key) => (
										<ListItem key={key} secondaryAction={brand.value} disableGutters dense >
											<ListItemIcon>
												<FormControlLabel
													label={<ListItemText>{brand.name}</ListItemText>}
													control={ <Checkbox
														checked={checkboxes[key]}
														onChange={(evt) => checkboxOnChangeHandler(evt, key, brand.name)}
													/>}
												/>
											</ListItemIcon>
										</ListItem>
									))}
								</List>
							</AccordionDetails>
						</Accordion>

						<Divider />

						<Accordion defaultExpanded={true}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography color='primary'> Price Range </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Slider
									step={5}
									marks={[{label: 'Min', value: 0}, {label: 'Max', value: 100}]}
									valueLabelDisplay='auto'
									value={sliderValue}
									onChange={sliderOnChangeHandler}
									// valueLabelFormat={(currentValue) => currentValue * 10}
									valueLabelFormat={(currentValue) => currentValue * (sliderFields.max - sliderFields.min)}
								/>
								<form noValidate onSubmit={sliderSubmitHandler}>
									<Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 5, mb: 2 }}>
										{sliderInputs.map(({label, name}, key) =>
											<TextField key={key}
												placeholder={label}
												type='number'
												value={sliderFields[name]}
												onChange={(evt) => sliderInputHandler(evt, name)}
												autoFocus={key === 1}
											/>
										)}
									</Box>
									<Button type='submit' fullWidth variant='contained'>Apply</Button>
								</form>
							</AccordionDetails>
						</Accordion>

						<Divider />

						<Accordion defaultExpanded={false}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography color='primary'>Size</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<ButtonGroup>
									{['xs', 'sm', 'lg', 'xxl'].map(item => <Button key={item}
										onClick={(evt) => filterSizeClickHandler(evt, item)}
									>{item}</Button> )}
								</ButtonGroup>
							</AccordionDetails>
						</Accordion>
					</Paper>

				</Grid>

				{/*-------[ Right Side ]--------*/}
				<Grid item md={9} >
					<Box sx={{
						display: 'flex',
						gap: 2,
						alignItems: 'center',
						my: 2,

					}}>
						<Typography sx={{ flexGrow: 1 }}>{products.length} Items found</Typography>
						<Autocomplete
							options={filterByOptions}
							getOptionLabel={option => option}
							renderInput={ params => <TextField {...params}
								label='Filter By'
								sx={{ minWidth: '200px' }}
							/>}
							value={filterBy}
							onChange={filterByChangeHandler}
						/>
						<ButtonGroup>
							{groupButtons.map(({icon, title}, key) => <Button key={key}
								variant={view === key ? 'contained' : 'outlined'}
								onClick={(evt) => groupButtonsHandler(evt, key)}
								title={title}
							> {icon}
							</Button>)}
						</ButtonGroup>
					</Box>

					{/*<Divider sx={{ my: 2 }} />*/}

					{view === 0 ? (// List View component
						<Paper sx={{ p: 1 }}>
							<Grid container spacing={2}>
								{products.map((product, key) => [
									<Grid key={key} item xs={12} sm={3} >
										<Link href={`/product/${product._id}`} passHref>
											<CardActionArea sx={{position: 'relative'}} sx={{ minHeight: 150 }} >
												<CardMedia
													component='img'
													src={product.coverImage?.secure_url || '/images/coverImage.jpg'}
													height={150}
												/>
												<Badge color='error' badgeContent='New' sx={{position: 'absolute', top: 20, left: 30, }} />
											</CardActionArea>
										</Link>
									</Grid>,

									<Grid key={`${key}-${key}`} item xs={12} sm={6} >
										<Typography color='primary'>{product.name}</Typography>
										<Box sx={{
											display: 'flex',
											gap: 2,
											alignItems: 'center',
										}}>
											<Typography>
												<Rating
													size='small'
													name='product rating'
													defaultValue={product.ratings}
													precision={.5}
													readOnly
												/>
											</Typography>

											<Typography color='primary'> {product.ratings || 4}/5 </Typography>
										</Box>
										<Typography color='textSecondary' align='justify'>{product.description}</Typography>
									</Grid>,

									<Grid key={`${key}-${key}-${key}`} item xs={12} sm={3} >
										<Box sx={{
											display: 'flex',
											flexDirection: 'column',
											height: '100%',
											justifyContent: 'center',
											gap: 3,
											p: 2
										}}>
											<Typography  variant='h6' >${product.price.toFixed(2)}</Typography>
											<Button variant='contained'fullWidth onClick={(evt) => addToCartHandler(evt, product)} >Add To Cart</Button>
										</Box>
									</Grid>,

								])}
							</Grid>
						</Paper>

					) : (// Grid View component

						<Grid container spacing={2}>
							{products.map((product, key) => (
							<Grid key={key} item xs={12} sm={6} md={4} >
								<Card>
									<Link href={`/product/${product._id}`} passHref>
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
										<Typography color='primary'>{product.name}</Typography>
										<Box sx={{
											display: 'flex',
											gap: 2,
											alignItems: 'center',
										}}>
											<Typography>
												<Rating
													size='small'
													name='product rating'
													defaultValue={product.ratings}
													precision={.5}
													readOnly
												/>
											</Typography>

											<Typography color='primary'> {product.ratings || 4}/5 </Typography>
										</Box>
										<Typography color='textSecondary' align='justify'>{shorter(product.description, 100)}</Typography>
										<Typography variant='h6' sx={{ my: 3 }} >${product.price.toFixed(2)}</Typography>
									</CardContent>

									<CardActions>
										<Button variant='contained'fullWidth onClick={(evt) => addToCartHandler(evt, product)} >Add To Cart</Button>
									</CardActions>
								</Card>
							</Grid>
							))}
						</Grid>
					)}



				</Grid>
			</Grid>

			<Pagination
				count={11}
				variant='outlined'
				color='primary'
				sx={{ my: 5, display: 'flex', maxWidth: '80vw', justifyContent: 'center' }}
				page={page}
				onChange={pageHandler}
			/>

		</Layout>
	)
}
export default Home



export const getServerSideProps = async (ctx) => {
	const { token } = nookies.get(ctx)

	let { page, limit, sort, fields, search, price, ratings, common, brand, size, category } = ctx.query

	let query = `page=${page || 1}`
	if(limit) 		query = `${query}&limit=${limit || 4}`
	if(sort) 			query = `${query}&sort=${sort}`
	if(fields) 		query = `${query}&fields=${fields}`
	if(search) 		query = `${query}&search=${search}`

	if(price) 		query = `${query}&price=${price}`
	if(ratings) 	query = `${query}&ratings=${ratings}`
	if(brand) 		query = `${query}&brand=${brand}`
	if(category) 	query = `${query}&category=${category}`
	if(size) 	query = `${query}&size=${size}`
	if(common) 		query = `${query}&common=${common}`

	const { origin } = absoluteUrl(ctx.req)
	const { data: { products } } = await axios.get(`${origin}/api/products?${query}`, {
		headers: { Authorization: `Bearer ${token}` }
	})

	return { props: { products } }
}


