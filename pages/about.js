import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
// import Error from 'next/error'
// import { useDispatch, useSelector } from 'react-redux'


import Layout from '../layout'
import { randomHexColor } from '../util'

import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Dialog from '@mui/material/Dialog'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import TextField from '@mui/material/TextField'
import UpdateProfileSkills from '../components/dialog/profileSkills'


const About = () => {
	const [open, setOpen] = useState(false)
	const [checked, setChecked] = useState(false)

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>

				<Button variant='contained' onClick={() => setOpen(true)}>Open Dialog</Button>
				<UpdateProfileSkills open={open} setOpen={setOpen} />

				<br /> <br />



				<Image src='/images/banner1.jpg' width='2000px' height='2000px' />


		</Layout>
	)
}
export default About
