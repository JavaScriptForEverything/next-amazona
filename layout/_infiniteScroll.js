import { useState, useEffect } from 'react'
import axios from 'axios'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const getPosts = async ({ page=1, limit=2 }) => {
	return await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
}

const InfiniteScroll = () => {
	const [ posts, setPosts ] = useState([])
	const [ page, setPage ] = useState(1)

	const limit = 10
	const totalPosts = 100

	const scrollHandler = async() => {
		const { scrollTop, clientHeight, scrollHeight } = document.documentElement

		if(page * limit <= totalPosts) { 												// don't request if no content available
			if(scrollTop + clientHeight >= scrollHeight) { 				// got to end of the page to check page end or not
				const { data } = await getPosts({ page, limit })
				setPosts( oldPost => oldPost.concat(data) )
				setPage(page++)
			}
		}
	}

	// // for first time
	// useEffect(() => getPosts({ limit }), [])

	useEffect(() => {
		window.addEventListener('scroll', scrollHandler)

		// useEffect Cleanup function to solve, so that don't try to update unmounted object.
		return () => window.removeEventListener('scroll', scrollHandler)
	}, [])


	return (
		<>
			{posts.map((item, key) => <Box key={key}>
				<Typography>{item.id}</Typography>
				<Typography>{item.title}</Typography>
				<Typography>{item.body}</Typography>
			</Box>)}
		</>
	)
}
export default InfiniteScroll


