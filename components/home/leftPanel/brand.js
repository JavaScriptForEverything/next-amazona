import nookies from 'nookies'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductBrands, addFilter, getAllProducts } from '../../../store/productReducer'

import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Brand = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { token } = nookies.get(null)

	// const [ brandsArr, setBrandsArr ] = useState([]) 										// filter-checkbox
	const [ brandItems, setBrandsItems ] = useState([]) 								// for multiple brand search
	const { brands } = useSelector(state => state.product)

	// get brand to show in front-end on page load
	useEffect(() => dispatch(getProductBrands(token)), []) 								// Get Brand items from backend
	// useEffect(() => {
	// 	setBrandsArr(brands.map(item => ({...item, brand: item._id, checked: false})))
	// }, [brands])

	useEffect(() => {

		// // here is one problems, if I try to get all the products on !brandItems.length
		// // then ?search or ?limit not work because it always redirect to home page

		// const params = new URLSearchParams(router.query).toString()

		// if(!brandItems.length ) {
		// 	router.push('/', undefined, {shallow: true})
		// 	dispatch(getAllProducts())

		// 	return
		// }


		if(brandItems.length) {
			// 1. Work on SSR on page refresh
			router.push(`?brand=${brandItems}`, undefined, { shallow: true })

			// 2. Work on click on XHR Request
			dispatch(addFilter('brand', brandItems, token)) 	// key, value, token
		}
	}, [brandItems])


	// console.log(brands)



	const changeHandler = (brand, index) => (evt, checked) => {
		setBrandsItems(items => checked ? [...items, brand] : items.filter(item => item != brand))
	}

	return (
		<Accordion defaultExpanded={false}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography color='primary'> Brands </Typography>
			</AccordionSummary>
			<AccordionDetails>
				<List >
					{brands.map(({_id: brand, count}, key) => (
						<ListItem key={brand} secondaryAction={count} disableGutters dense >
							<ListItemIcon>
								<FormControlLabel
									label={<ListItemText>{brand}</ListItemText>}
									control={ <Checkbox
										// checked={checked}
										onChange={changeHandler(brand, key)}
									/>}
								/>
							</ListItemIcon>
						</ListItem>
					))}
				</List>
			</AccordionDetails>
		</Accordion>
	)
}
export default Brand
