import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Layout from '../layout'
import InfiniteScroll from '../layout/_infiniteScroll'
import Typography from '@mui/material/Typography'
import Button  from '@mui/material/Button'
import MuiLink  from '@mui/material/Link'




const About = () => {
	const dispatch = useDispatch()
	const [ value, setValue ] = useState(0)


	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>
		{/*<InfiniteScroll />*/}



		<Link href='/contact' passHref>
			<MuiLink>
				<Image
					src='/images/products/uRmdaz2gIjZZ_U1XAJrzd.jpg'
					width={1600}
					height={900}
				/>
			</MuiLink>
		</Link>

{/*		<Link href='/contact' passHref>
			<MuiLink>
				<Image
					src='/images/products/uRmdaz2gIjZZ_U1XAJrzd.jpg'
					style={{ width: '100%', height: 'auto' }}
				/>
			</MuiLink>
		</Link>
*/}


		</Layout>
	)
}
export default About


