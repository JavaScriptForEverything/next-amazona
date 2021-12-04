import { useState, useEffect } from 'react'

import { readAsDataURL } from '../../util'

import Dialog from '@mui/material/Dialog'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'

import ClearIcon from '@mui/icons-material/Clear'
import PersonIcon from '@mui/icons-material/Person'

const FormDialog = ({ open, setOpen}) => {
	// const [ open, setOpen ] = useState(true)
	const [ avatar, setAvatar ] = useState()
	const [ avatarError, setAvatarError ] = useState()

	// console.log(avatar)

	useEffect(() => { // handle Error inside useEffect
		if(!avatar) return setAvatarError('Please pick a photo')
		setAvatarError('')
	}, [avatar, avatarError])

	const fileHandler = (evt) => readAsDataURL(evt.target.files[0], setAvatar)
	const closeHandler = () => setOpen(false)
	const resetHandler = (evt) => {
		setAvatar('') 							// clear avatar state value
		evt.target.form.reset() 		// reset form
	}
	const submitHandler = (evt) => {
		evt.preventDefault()

	console.log(avatar)
	}

	return (
		<Dialog open={open} onClose={closeHandler} hideBackdrop >
			<Container maxWidth='xs' disableGutters >
				<Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 1, mr: 1}} >
					<IconButton onClick={closeHandler} >
						<ClearIcon />
					</IconButton>
				</Box>

				<Box sx={{py: 3, px: 2}}>
					<Box sx={{
							mb: 2,
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
							alignItems: 'center'
						}}
					>
						<Avatar sx={{
							width: 80, height: 80,
							border: (theme) => `1px solid ${theme.palette.primary.main}`,
							backgroundColor: 'transparent'
						}}
							src={avatar}
						>
						 { <PersonIcon color='primary' />}
						</Avatar>

						<Typography variant='h5' paragraph sx={{ textTransform: 'uppercase'}} >Photo Upload</Typography>
					</Box>

					<form onSubmit={submitHandler} noValidate >
						<TextField
							label='Upload Photo'
							placeholder='Upload Photo'
							InputLabelProps={{ shrink: true }}
							InputProps={{
								inputProps: { accept: 'image/*' }
							}}
							required
							fullWidth
							type='file'
							onChange={fileHandler}
							error={!!avatarError}
							helperText={avatarError}
						/>
						<Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3}} >
							<Button variant='outlined' disabled={!avatar} onClick={resetHandler} >Reset</Button>
							<Button variant='contained' type='submit' disabled={!avatar} >Update</Button>
						</Box>
					</form>
				</Box>
			</Container>
		</Dialog>
	)
}
export default FormDialog

