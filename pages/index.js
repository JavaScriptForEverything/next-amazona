import { useState, useEffect } from 'react'
import nookies from 'nookies'
import absoluteUrl from 'next-absolute-url'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../store/dialogReducer'
import { addItemToCart, getProductBrands } from '../store/productReducer'
import { filterPush, shorter } from '../util'

import Link from 'next/link'
import { useRouter } from 'next/router'

import Layout from '../layout'
import Header from '../components/home/header.js'


import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
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
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ListIcon from '@mui/icons-material/List'
import GridViewIcon from '@mui/icons-material/GridView'
import SearchIcon from '@mui/icons-material/Search'


const { token } = nookies.get(null)

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
	const [ sliderValue, setSliderValue ] = useState([0, 100]) 						// filter-slider
	const [ sliderFields, setSliderFields ] = useState(sliderInputsObj)
	const [ filterBy, setFilterBy ] = useState(filterByOptions[0]) 				// filter-Autocomplete
	// const [ checkboxes, setCheckboxes ] = useState([]) 										// filter-checkbox

	const [ page, setPage ] = useState(1) 																// bottom page nagivation

	const { error, cartItems, brands } = useSelector(state => state.product)
	const [ brandsObj, setBrandsObj ] = useState([]) 										// filter-checkbox

	console.log(products.length)


	// get brands from backend
	useEffect(() => dispatch(getProductBrands(token)), [])

	useEffect(() => {
		setBrandsObj(brands.map(item => ({...item, brand: item._id, checked: false})))
	}, [brands])


	// Make view parmanent
	useEffect(() => { // convert to number and only 1 if not zeor|false
		const currentView = +localStorage.getItem('view')	?? 1
		setView(currentView)
	}, [view])


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


	const brandOnChangeHandler = (evt, brandId ) => {
		const currentArr = brandsObj.map( (item, id) => id === brandId ? ({...item, checked: !item.checked}) : item )
		setBrandsObj(currentArr)

		// get an array of single property of Object which is a child of an array
		const tempArr = currentArr.map((item) => item.checked ? item.brand : '' )

		// Remove falsy value from an array
		tempArr = tempArr.filter(Boolean)

		// send brand value as array [converted to string] to Backend Server
			// if true allow multiple search together => in that case I have to add checkbox & clear button for every search
		false ? filterPush(router, 'brand', tempArr) : router.push(`?brand=${tempArr}`)
	}




	const inputSearchHandler = (evt) => setInputSearchValue(evt.target.value)
	const inputSearchSubmitHandler = (evt) => {
		evt.preventDefault()

		// false ? filterPush(router, 'search', inputSearchValue) : router.push(`?search=${inputSearchValue}`)
		false ? filterPush(router, 'search', ['name', inputSearchValue]) : router.push(`?search=${['name', inputSearchValue]}`)
	}

	const ratingsClickHandler = (evt, ratings) => {
		false ? filterPush(router, 'ratings', ratings) : router.push(`?ratings=${ratings}`)
	}

	const sliderOnChangeHandler = (evt, newValue) => setSliderValue(newValue)
	const sliderInputHandler = (evt, name) => setSliderFields({ ...sliderFields, [name]: evt.target.value })
	const sliderSubmitHandler = (evt) => {
		evt.preventDefault()

		const currentValue = sliderValue.map(item => item * (sliderFields.max - sliderFields.min))

		false ? filterPush(router, 'price', currentValue) : router.push(`?price=${currentValue}`)
	}

	const filterSizeClickHandler = (evt, item) => {
		false ? filterPush(router, 'size', item) : router.push(`?size=${item}`)
	}

	const filterByChangeHandler = (evt, newValue) => {
		setFilterBy(newValue)

		console.log({ value: newValue })
		// false ? filterPush(router, 'common', newValue) : router.push(`?common=${newValue}`)
	}

	const pageHandler = (evt, newValue) => {
		setPage(newValue)

		false ? filterPush(router, 'page', newValue) : router.push(`?page=${newValue}`)
	}



	return (
		<Layout>
			<Header />
			<Grid container spacing={2} sx={{ my: 2 }} >
				{/*-------[ Left Side ]--------*/}
				<Grid item xs={12} md={3}>
					<Paper>
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

						<Divider />

						<Accordion defaultExpanded={true}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography color='primary'> Ratings</Typography>
							</AccordionSummary>
							<AccordionDetails>
									{[1, 2, 3, 4, 5].reverse().map((value, key) => <ListItem key={key}
										sx={{cursor: 'pointer'}}
										onClick={evt => ratingsClickHandler(evt, value)}
									>
										<Rating
											size='small'
											name='product rating'
											defaultValue={value}
											precision={.2}
											readOnly
										/>
									</ListItem> )}
							</AccordionDetails>
						</Accordion>

						<Divider />

						<Accordion defaultExpanded={true}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography color='primary'> Brands </Typography>
							</AccordionSummary>
							<AccordionDetails>
								<List >
									{brandsObj.map(({brand, checked, count}, key) => (
										<ListItem key={key} secondaryAction={count} disableGutters dense >
											<ListItemIcon>
												<FormControlLabel
													label={<ListItemText>{brand}</ListItemText>}
													control={ <Checkbox
														checked={checked}
														onChange={(evt) => brandOnChangeHandler(evt, key)}
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

						<Accordion defaultExpanded={true}>
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
										<Link href={`/product/${product.slug}`} passHref>
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
									<CardHeader
										title={product.name}
										action={<IconButton><MoreVertIcon /></IconButton>}
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
	if(brand) 		query = `${query}&brand=${brand}`

	if(price) 		query = `${query}&price=${price}`
	if(ratings) 	query = `${query}&ratings=${ratings}`
	if(category) 	query = `${query}&category=${category}`
	if(size) 	query = `${query}&size=${size}`
	// if(common) 		query = `${query}&common=${common}`

	const { origin } = absoluteUrl(ctx.req)
	const { data: { products } } = await axios.get(`${origin}/api/products?${query}`, {
		headers: { Authorization: `Bearer ${token}` }
	})

	return { props: { products } }
}


