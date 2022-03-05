import Image from 'next/image'
import { useSelector } from 'react-redux'

import Typography from '@mui/material/Typography'

const ImageSlide = () => {
	const { loading, product } = useSelector(state => state.product)

	console.log({ loading })

	return (
		<>
			<Image
				src={product.coverImage?.secure_url}
				width='100%' height='100%'
				layout='responsive'
			/>
		</>
	)
}
export default ImageSlide
