import { useState, useEffect, useCallback, useMemo } from 'react'

import Layout from '../layout'
import InfiniteScroll from '../layout/_infiniteScroll'
import Typography from '@mui/material/Typography'



import {Box, Button } from '@mui/material'




const About = () => {
	const [ value, setValue ] = useState(0)



	// const data = [1, 2, 3]
	const data = useMemo(() => [1, 2, 3], [])

	// const fetchData = (users) => {
	// 	fetch(`https://jsonplaceholder.typicode.com/${users}`)
	//   .then(response => response.json())
	//   .then(json => console.log(json))
	// }

	const fetchData = useCallback((users) => {
		fetch(`https://jsonplaceholder.typicode.com/${users}`)
	  .then(response => response.json())
	  .then(json => console.log(json))
	}, [])


	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>
		{/*<InfiniteScroll />*/}





		</Layout>
	)
}
export default About


