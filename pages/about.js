import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'


import Layout from '../layout'



import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import Rating from '@mui/material/Rating'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import MoreVertIcon from '@mui/icons-material/MoreVert'


const About = () => {
	// const [ buttons, setButtons ] = useState([])
	const [ button, setButton ] = useState(0)

	// const clickHandler = (evt, id) => {
	// 	setButtons( buttonsOfGroup.map((button, key) => key === id ?
	// 		{...button, checked: !button.checked} : button))
	// }
	const clickHandler = (evt, id) => {
		setButton(id)
	}

	const product = {
		_id: '12341234123412341234',
		avatar: '',
		name: 'the see expoler',
		summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro reiciendis, rerum excepturi',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro reiciendis, rerum excepturi sunt tempore esse dicta eaque temporibus animi expedita ipsa, nobis molestias et ullam corrupti fugit, sint incidunt beatae'
	}

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>


{/*			<Card>

				<CardHeader
					title={product.name}
					subheader={<Box sx={{
						display: 'flex',
						justifyContent: 'space-between',
						mb: 1
					}}>
						<Typography color='TextSecondary'> <Rating size='small' name='rating' defaultValue={5} /> </Typography>
						<Typography color='TextSecondary' fontSize='small'> Object Id: {product._id} </Typography>
					</Box>}
					action={<IconButton><MoreVertIcon /></IconButton>}
				/>
				<CardActionArea>
					<CardMedia src='/images/coverImage.jpg' component='img' />
				</CardActionArea>

				<CardContent>
					<Typography color='TextSecondary' align='justify'> {product.description} </Typography>
				</CardContent>

				<CardActions sx={{display: 'flex', justifyContent: 'flex-end', my: 1 }} >
					<Button variant='contained'>Details</Button>
				</CardActions>
			</Card>
*/}


		</Layout>
	)
}
export default About


