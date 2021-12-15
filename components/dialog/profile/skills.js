import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { updateProfile } from '../../../store/userReducer'

import Dialog from '@mui/material/Dialog'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Alert from '@mui/material/Alert'

import ClearIcon from '@mui/icons-material/Clear'
import PersonIcon from '@mui/icons-material/Person'


const optionsItems = ['None', 'ReactJS', 'Redux', 'Material-UI', 'NodeJS', 'MongoDB', 'ExpressJS']


const FormDialog = ({ open, setOpen }) => {
	const dispatch = useDispatch()

	const [ disabled, setDisabled ] = useState(false)
	const [ isUpdated, setIsUpdated ] = useState(false)
	const [ checked, setChecked ] = useState(false) 				// Controll Switch Component

	const [ skill, setSkill ] = useState(optionsItems[0])
	const [ skillError, setSkillError ] = useState()

	const { user } = useSelector(state => state.user)


	useEffect(() => { // handle Error inside useEffect
		if(!skill) return setSkillError('Please pick a skill')
		if(skill === 'None') return setDisabled(true)
	}, [skill])

	const changeHandler = (evt, item, action) => {
		setDisabled(false)
		setIsUpdated(false) 	// make button add/remove instead of Added/Removed

		setSkill(item) 				// just add this item into skill state, that's it
		setSkillError('') 		// clear old error message

		// Added Features: 		if skill already added and it is adding Button then stop
		const isExist = user.skills.find(fildItem => fildItem === item)
		if(isExist && checked) {
			setSkillError(`'${skill}' skill already added`) 	// submitHandler will check if no error then proseed
			setIsUpdated(true) 																// Off course, we disable the form + add 'Added' label
		}

	}

	const closeHandler = () => setOpen(false)
	const resetHandler = (evt) => {
		setIsUpdated(false) 					// add updated text after added to skills array
		// setSkill('') 									// clear skill state value + autoComplete
		// evt.target.form.reset() 		// reset form
	}
	const submitHandler = (evt) => {
		evt.preventDefault()
		if(skillError) return 	// dispatch error handler, and useEffect will show error

		// add features
		if(!checked) {
			const filtered = user.skills.filter(item => item !== skill)
			dispatch(updateProfile({ skills: filtered })) // Remove skills in database too
		} else {
			// remove features
			dispatch(updateProfile({ skills: [...user.skills, skill] }))
		}

		setIsUpdated(true) 							// Apply to both
	}

	return (
		<Dialog
			open={open}
			onClose={closeHandler}
			hideBackdrop
			PaperProps={{
				sx: { minWidth: 360 }
			}}
		>
			<Container maxWidth='xs' disableGutters >
				<Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 1, mr: 1}} >
					<IconButton onClick={closeHandler} >
						<ClearIcon />
					</IconButton>
				</Box>

				<Box sx={{pb: 3, px: 2}}>
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
							src={user.avatar}
						>
						 { <PersonIcon color='primary' />}
						</Avatar>

						<Typography variant='h6' sx={{ textTransform: 'uppercase'}} >Skills</Typography>
					</Box>

					{isUpdated && <Alert sx={{mb: 2}} severity='success' color='info'> Skill {checked ? 'Added' : 'Removed'} </Alert> }

					<form onSubmit={submitHandler} noValidate >
						<Autocomplete
							options={checked ? optionsItems : ( user.skills ? user.skills : [])}
							getOptionLabel={option => option}
							renderInput={params => <TextField {...params}
								label={ checked ? 'Add Skill' : 'Remove Skill'}
								placeholder={ checked ? 'Add Skill' : 'Remove Skill'}
								InputLabelProps={{ shrink: true }}
								required
								error={!!skillError}
								helperText={skillError}
							/> }
							fullWidth
							onChange={changeHandler}
							value={skill}
						/>
						<FormControlLabel
							label={checked ? 'Add' : 'Remove'}
							control={<Switch
								checked={checked}
								onChange={() => setChecked(check => !check)}
							/>}
						/>
						<Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3}} >
							<Button variant='outlined' disabled={!skill} onClick={resetHandler} >Reset</Button>
							<Button variant='contained' type='submit' disabled={disabled || !skill || isUpdated} >
								{/*{ isUpdated ? 'Updated' : 'Update' }*/}
								{ checked ? (isUpdated ? 'Added' : 'Add') : (isUpdated ? 'Removed' : 'Remove') }
							</Button>
						</Box>
					</form>
				</Box>
			</Container>
		</Dialog>
	)
}
export default FormDialog

