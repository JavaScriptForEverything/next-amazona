import { useState, useEffect } from 'react'
import Link from 'next/link'
// import Error from 'next/error'
// import { useDispatch, useSelector } from 'react-redux'


import Layout from '../layout'

import Typography from '@mui/material/Typography'
import MuiLink from '@mui/material/Link'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'

import TextField from '@mui/material/TextField'

import UploadPhoto from '../components/dialog/uploadPhoto'


const About = () => {
	const [open, setOpen] = useState(false)

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>

				<Button variant='contained' onClick={() => setOpen(true)}>Open Dialog</Button>
				<UploadPhoto open={open} setOpen={setOpen} />


		</Layout>
	)
}
export default About
