import Link from 'next/link'
import Image from 'next/image'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import MuiLink from '@mui/material/Link'

const ProductListView = ({ product }) => {
	return (
		<Paper sx={{
			display: 'grid',
			gridTemplateColumns: '1fr 2fr 1fr',
			gridGap: 8,
			my: 2,
		}}>
			<Box sx={{placeSelf: 'stretch'}}>
				<Link href={`/product/${product.slug}`} passHref>
					<MuiLink>
						<Image
							src={product.coverImage.secure_url}
							width={200}
							height={200}
							layout='responsive'
						/>
					</MuiLink>
				</Link>
			</Box>

			<Box sx={{p: 2 }}>
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
				/>
				<Typography sx={{mt: 2}} color='textSecondary'>{product.summary}</Typography>
			</Box>

			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				m: 2,
			}}>
				<Typography variant='h6'>${product.price.toFixed(2)}</Typography>
				<Button
					variant='contained'
					sx={{whiteSpace: 'nowrap', mt: 'auto'}}
				>Add To Cart</Button>
			</Box>

		</Paper>
	)
}
export default ProductListView
