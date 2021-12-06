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
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import TextField from '@mui/material/TextField'
import UpdateProfileSkills from '../components/dialog/updateProfileSkills'


const About = () => {
	const [open, setOpen] = useState(false)
	const [checked, setChecked] = useState(false)

	return (
		<Layout title='about page'>
			<Typography>About Page</Typography>

				<Button variant='contained' onClick={() => setOpen(true)}>Open Dialog</Button>
				<UpdateProfileSkills open={open} setOpen={setOpen} />

				<br />

				<TextField
					label='Username'
				/> <br />
				<FormControlLabel
					label={!checked ? 'Remove' : 'Add'}
					labelPlacement='end'
					control={<Switch
						color='primary'
						checked={checked}
						onChange={() => setChecked(check => !check)}
					/>}
				/>


		</Layout>
	)
}
export default About
