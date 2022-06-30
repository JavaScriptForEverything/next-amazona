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
				width={300} 
				height={250}
				layout='responsive'

				// blurDataURL='/BannerForGithub.png'
				// placeholder='blur'
			/>
		</>
	)
}
export default ImageSlide
