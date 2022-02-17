import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductBrands } from '../../../store/productReducer'
import nookies from 'nookies'

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
	const dispatch = useDispatch()
	const [ brandsObj, setBrandsObj ] = useState([]) 										// filter-checkbox

	const { brands } = useSelector(state => state.product)

	const { token } = nookies.get(null)
	useEffect(() => dispatch(getProductBrands(token)), [])

	useEffect(() => {
		setBrandsObj(brands.map(item => ({...item, brand: item._id, checked: false})))
	}, [brands])

	const changeHandler = (evt, index) => {
		console.log({ index })
	}

	return (
		<Accordion defaultExpanded={false}>
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
										onChange={(evt) => changeHandler(evt, key)}
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
