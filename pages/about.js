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
import ListIcon from '@mui/icons-material/List'
import GridViewIcon from '@mui/icons-material/GridView'

const buttonsOfGroup = [
	{ icon: <ListIcon />, 		checked: false },
	{ icon: <GridViewIcon />, checked: false },
]

const About = () => {
	// const [ buttons, setButtons ] = useState([])
	const [ button, setButton ] = useState(0)

	// const clickHandler = (evt, id) => {
	// 	setButtons( buttonsOfGroup.map((button, key) => key === id ?
	// 		{...button, checked: !button.checked} : button))
	// }
	const clickHandler = (evt, id) => {
		setButton(id)
	}

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>

{/*			<ButtonGroup>
				{buttonsOfGroup.map(({icon}, key) => <Button key={key}
					// variant={buttons[key]?.checked ? 'contained' : 'outlined'}
					// variant={ !buttons.length && key === 0 ? 'contained' : (buttons[key]?.checked ? 'contained' : 'outlined')}
					variant={ !buttons[key] && key === 0 ? 'contained' : (buttons[key]?.checked ? 'contained' : 'outlined')}
					onClick={(evt) => clickHandler(evt, key)}
				>{icon}</Button>)}
			</ButtonGroup>
*/}
			<ButtonGroup>
				{buttonsOfGroup.map(({icon}, key) => <Button key={key}
					variant={key === button ? 'contained' : 'outlined'}
					onClick={(evt) => clickHandler(evt, key)}
				>{icon}</Button>)}
			</ButtonGroup>

		</Layout>
	)
}
export default About


