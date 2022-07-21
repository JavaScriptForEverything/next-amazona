import Link from 'next/link'
import Image from 'next/image'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import MuiLink from '@mui/material/Link'

const ProductGridView = ({ product }) => {
	return (
		<Card sx={{height: '100%', display: 'flex', flexDirection: 'column', }}>

			<Link href={`/product/${product.slug}`} passHref>
				<MuiLink>
					<Image
						src={product?.coverImage?.secure_url}
						width={640}
						height={360}
						layout='responsive'
					/>
				</MuiLink>
			</Link>

			<CardContent sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
				<Link href={`/product/${product.slug}`} passHref>
					<MuiLink>
						<Typography color='primary'>{product.name} [ {product.brand} ]</Typography>
					</MuiLink>
				</Link>
				<Rating
					readOnly
					value={product.ratings}
					size='small'
					precision={.5}
					sx={{mb: 2}}
				/>

				<Box sx={{mt: 'auto'}} >
					<Typography variant='h6' paragraph>${product.price.toFixed(2)}</Typography>
					<Button
						variant='contained'
						fullWidth
					>Add To Cart</Button>
				</Box>
			</CardContent>
		</Card>
	)
}
export default ProductGridView
