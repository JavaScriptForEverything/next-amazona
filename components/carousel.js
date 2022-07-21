import Image from 'next/image'
import { useState } from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

/* 	<Carousel
			images={product.images.map(image => image.secure_url)}
			// width={500}
			// height={250}
			// indicators={true}
		/> */
const Carousel = (props) => {
	const {
		images=[],
		width=640,
		height=360,
		indicators=false,
	} = props

	const [ image, setImage ] = useState(0)

	const style = {
		position: 'absolute',
		right: 8,
		top: '50%',
		color: 'white',
		backgroundColor: '#1976d288',
		'&:hover' : {
			backgroundColor: '#1976d2'
		}
	}

	const prevHandler = () => {
		if(image <= 0) return setImage(images.length-1)
		setImage(image - 1)
	}

	const nextHandler = () => {
		if(image >= images.length-1) return setImage(0)
		setImage(image + 1)
	}

	return (
		<>
		<Box sx={{ position: 'relative' }}>
			<Image key={images[image]}
				src={images[image]}
				width={width}
				height={height}
				layout='responsive'
				alt={images[image]}
			/>

			{/*{image > 0 && (*/}
			<IconButton sx={{ ...style, left: 8 }} onClick={prevHandler} >
				<KeyboardArrowLeftIcon />
			</IconButton>
			{/*)}*/}

			{/*{image < images.length-1 && (*/}
			<IconButton sx={style} onClick={nextHandler} >
				<KeyboardArrowRightIcon />
			</IconButton>
			{/*)}*/}

		</Box>

		{ indicators && (
			<Box sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				my: 1,
			}}>
				{[...Array(images.length)].map((_, i) => (
					<FiberManualRecordIcon key={i}
						fontSize='small'
						sx={ image !== i ? { color: 'gray' } : { color: 'dodgerblue' } }
						onClick={() => setImage(i)}
					/>
				))}
			</Box>
		)}

		</>
	)
}
export default Carousel
