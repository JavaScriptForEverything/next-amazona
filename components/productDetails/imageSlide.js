import Image from 'next/image'
import { useSelector } from 'react-redux'

import Carousel from '../carousel'
import Typography from '@mui/material/Typography'

const ImageSlide = () => {
	const { loading, product } = useSelector(state => state.product)

	// console.log(product.images)

	return (
		<>
		<Carousel
			images={product.images.map(image => image.secure_url)}
			// width={500}
			// height={250}
			indicators={true}
		/>
{/*			<Image
				src={product.coverImage?.secure_url}
				width={300}
				height={250}
				layout='responsive'
			/>
*/}

{/*				{product.images.map(image => (
					<Image key={image.public_url}
						src={image.secure_url}
						width={300}
						height={250}
						layout='responsive'
					/>
				))}
*/}
		</>
	)
}
export default ImageSlide
