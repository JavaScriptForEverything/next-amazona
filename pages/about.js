import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'


import Layout from '../layout'
import Typography from '@mui/material/Typography'


import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const selectItems = [
	{ label: 'Javascript', 	name: 'javascript', value: 'javascript' },
	{ label: 'PHP', 				name: 'php', 				value: 'php' },
	{ label: 'Python', 			name: 'python', 		value: 'python' },
]

const About = () => {
	const [ value, setValue ] = useState('')
	const changeHandler = async (evt) => setValue(evt.target.value)
	console.log(value)



	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>

			<FormControl fullWidth>
				<InputLabel>Year</InputLabel>

				<Select label='Age' value={value} onChange={changeHandler}>
					<MenuItem value={''} ></MenuItem>

					<MenuItem value={1} >Item 1</MenuItem>
					<MenuItem value={2} >Item 2</MenuItem>

					{selectItems.map(({ label, name, value}, key) => <MenuItem key={key}
						value={name} >{label}</MenuItem>
					)}
				</Select>
			</FormControl>



		</Layout>
	)
}
export default About


