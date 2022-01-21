import { useState, useEffect } from 'react'

import Layout from '../layout'
import InfiniteScroll from '../layout/_infiniteScroll'
import Typography from '@mui/material/Typography'


import {
	TextField ,
	Button
} from '@mui/material'


import SearchIcon from '@mui/icons-material/Search'


const About = () => {
	const [ value, setValue ] = useState('')

	const changeHandler = (evt) => {
		setValue(evt.target.value)
	}

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>
		{/*<InfiniteScroll />*/}

	 <TextField
    label="Name"
    value="hello"
    InputProps={{endAdornment: <Button><SearchIcon /></Button>}}
  />




		</Layout>
	)
}
export default About


