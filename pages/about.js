import { useState, useEffect } from 'react'

import Layout from '../layout'
import InfiniteScroll from '../layout/_infiniteScroll'
import Typography from '@mui/material/Typography'

import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import Chip from '@mui/material/Chip'

import { Tooltip, IconButton } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'


const About = () => {
	const [ value, setValue ] = useState('')

	const changeHandler = (evt) => {
		setValue(evt.target.value)
	}

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>
		<InfiniteScroll />




		</Layout>
	)
}
export default About


