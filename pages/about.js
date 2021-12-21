import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
// import { useDispatch, useSelector } from 'react-redux'
import { wrapper } from '../store'


import Layout from '../layout'
import { randomHexColor } from '../util'

import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Dialog from '@mui/material/Dialog'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'


import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SearchIcon from '@mui/icons-material/Search'

const buttons = [
	{ label: 'Button-1', name: 'btn-1', checked: true },
	{ label: 'Button-2', name: 'btn-2', checked: false },
	{ label: 'Button-3', name: 'btn-3', checked: true },
]

const About = () => {
	const [ checked, setChecked ] = useState([])

	console.log(checked)

	const clickedHandler = (evt, id) => {
		setChecked( buttons.map((item, index) => index === id ? [...checked, !item] : [...checked] ))
	}

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>
				{/*<Image src='/images/banner1.jpg' width='2000px' height='2000px' />*/}


				<ButtonGroup>
					<Button variant='contained'>Left</Button>
					<Button><ArrowDropDownIcon /></Button>
				</ButtonGroup>

				{buttons.map((item, key) => (
					<Button key={key}
						variant={checked[key] ? 'contained' : 'outlined'}
						onClick={ evt => clickedHandler(evt, key)}
					>Button {key + 1}</Button>
				))}




		</Layout>
	)
}
export default About


