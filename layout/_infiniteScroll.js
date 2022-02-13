import { useState, useEffect } from 'react'
import axios from 'axios'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const getPosts = async ({ page=1, limit=2 }) => {
	return await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
}

const InfiniteScroll = () => {
	const [ page, setPage ] = useState(1)
	const [ loading, setLoading ] = useState(false)
	const [ posts, setPosts ] = useState([])

	const limit = 10
	const totalPosts = 100


	useEffect(async() => {
		setLoading(true)
		const { data } = await getPosts({ page, limit })
		setPosts(prevPosts => [...prevPosts, ...data])
		setLoading(false)
	}, [page])

	const handleScroll = (evt) => {
		const { scrollTop, clientHeight, scrollHeight } = document.documentElement
		if(scrollTop + clientHeight === scrollHeight && page < 10 ) setPage(++page)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
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


