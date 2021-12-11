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
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Dialog from '@mui/material/Dialog'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import TextField from '@mui/material/TextField'


const About = () => {
	const [open, setOpen] = useState(false)
	const [checked, setChecked] = useState(false)

	const { user } = useSelector(state => state.user )

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>
				{/*<Image src='/images/banner1.jpg' width='2000px' height='2000px' />*/}

				<Button variant='contained' onClick={() => setOpen(true)}>Open Dialog</Button>

				<br /> <br />

			<object data="/resume.pdf" type="file"></object>

{/*			<embed
		    src="/resume.pdf"
		    type="application/pdf"
		    frameBorder="0"
		    scrolling="auto"
		    height="100%"
		    width="100%"
			></embed>

			<iframe
		    src="/resume.pdf"
		    frameBorder="0"
		    scrolling="auto"
		    height="100%"
		    width="100%"
			></iframe>
*/}
{/*			<object data="/resume.pdf" type="application/pdf" width="300" height="200">
				<a href="data/test.pdf">test.pdf</a>
			</object>
*/}



		</Layout>
	)
}
export default About


