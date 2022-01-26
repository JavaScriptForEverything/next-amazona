import { useState, useEffect } from 'react'

import Layout from '../layout'
import InfiniteScroll from '../layout/_infiniteScroll'
import Typography from '@mui/material/Typography'


import {
	Box
} from '@mui/material'




const About = () => {


	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>
		<InfiniteScroll />




		</Layout>
	)
}
export default About


