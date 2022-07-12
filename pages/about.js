import { useState, useEffect, useCallback, useMemo } from 'react'
import { getMe } from '../store/userReducer'
import { useDispatch } from 'react-redux'

import Layout from '../layout'
import InfiniteScroll from '../layout/_infiniteScroll'
import Typography from '@mui/material/Typography'
import Button  from '@mui/material/Button'




const About = () => {
	const dispatch = useDispatch()
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


	const getMeHandler = () => {
		dispatch(getMe())
	}

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>
		{/*<InfiniteScroll />*/}

		<Button 
			variant='outlined'
			onClick={getMeHandler}
		> get me </Button>




		</Layout>
	)
}
export default About


