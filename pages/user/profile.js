import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import nookies from 'nookies'
import { updateProfile } from '../../store/userReducer'

import Layout from '../../layout'
import { toCapitalize, readAsDataURL } from '../../util'
import { description } from '../../data/profile'
import ProfileSkills from '../../components/dialog/profile/skills'
import ProfileBasicInfo from '../../components/dialog/profile/basicInfo'
import ProfileSendMail from '../../components/dialog/profile/sendMail'
import ProfileAddExperience from '../../components/dialog/profile/addExperience'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'


import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import UploadIcon from '@mui/icons-material/Upload'
import FileDownloadIcon from '@mui/icons-material/Download'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const avatarMenuItems = [
	{label: 'Upload Photo', icon: <UploadIcon />},
	{label: 'Delete Photo', icon: <DeleteIcon />}
]
const experiencesInfo = [
	// {label: 'create', icon: <AddIcon />},
	{label: 'Update', icon: <EditIcon />},
	{label: 'Delete', icon: <DeleteIcon />}
]





const Profile = () => {
	const dispatch = useDispatch()

	const [ avatarOpen, setAvatarOpen ] = useState(false)
	const [ avatarAnchorEl, setAvatarAnchorEl ] = useState()
	const [ avatarFile, setAvatarFile ] = useState()

	const [ experienceMenuOpen, setExperienceMenuOpen ] = useState(false)
	const [ experienceAnchorEl, setExperienceAnchorEl ] = useState()

	const [ openSkill, setOpenSkill ] = useState(false) 	// profile Skill handler
	const [ openBasic, setOpenBasic ] = useState(false) 	// profile Basic Info handler
	const [ openMail, setOpenMail ] = useState(false) 		// profile Basic Send Mail Button handler
	const [ openAddExperience, setOpenAddExperience ] = useState(false)

	const { user } = useSelector(state => state.user)
	// console.log(user.resume)

	// update/delete avatar here
	useEffect(() => {
		dispatch(updateProfile({ avatar: avatarFile })) 	// update avatar in store + in Database
		setAvatarOpen(false)
	}, [avatarFile])




	const avatarMenuCloseHandler = () => setAvatarOpen(false)
	const profileAvatarClickHandler = (evt) => {
		setAvatarAnchorEl(evt.currentTarget)
		setAvatarOpen(true)
	}
	const avatarMenuItemHandler = (evt, label, items) => {
		if(label === items[0].label) return 			// if upload avatar then handle in useEffect()

		setAvatarOpen(false) 											// immediately close menu Popup
		dispatch(updateProfile({ avatar: '' })) 	// delete avatar from database + redux store
	}
	const inputFileChangeHandler = (evt) => {
		readAsDataURL(evt.target.files[0], setAvatarFile)
	}


	// Experience Items: 		MoreVertIcon
	const menuCloseHandler = () => setExperienceMenuOpen(false)
	const moreVertHandler = (evt) => {
		setExperienceAnchorEl(evt.currentTarget)
		setExperienceMenuOpen(true)
	}
	const menuItemHandler = (evt, menuItem) => {
		menuCloseHandler()

		// edit and delete item
		console.log(menuItem)
	}

	const profileSkillHandler = () => setOpenSkill(true)
	const basicEditButtonHandler = () => setOpenBasic(true)
	const sendMailHandler = () => setOpenMail(true)
	const experienceAddButtonHandler = () => setOpenAddExperience(true)




	const basic = [
		{ label: 'Age', value: `${ user.age || 15} Years` },
		{ label: 'Years of Experience', value: `${user.experience || 1} Years`},
		{ label: 'Phone', value: user.phone || '01957500605' },
		{ label: 'CTC', value: `${user.ctc || 2.5} Lac` },
		{ label: 'Location', value: user ? toCapitalize(`${user.location.city} ${user.location.country}`) : 'Dhaka, Bangladesh'  },
		{ label: 'Email', value: user.email || 'javascriptforeverything@gmail.com'  },
	]
	const experiences = [
		{
			title: 'Pixel Studio',
			subheader: 'Ux/UI Designer',
			date: 'Apr 2010',
			status: 'Present',
			location: 'Dhaka, Bangladesh',
			backgroundColor: '#42a5f5'
		},
		{
			title: 'Ramasion Studio',
			subheader: 'Web Designer',
			date: 'May 2017',
			status: 'Present',
			location: 'Dhaka, Bangladesh',
			backgroundColor: 'lightPink'
		},
	]


	return (
		<Layout>

			{/*-----[ dialog/models ]------*/}
			{ user && <ProfileSkills open={openSkill} setOpen={setOpenSkill} /> }
			{ user && <ProfileBasicInfo open={openBasic} setOpen={setOpenBasic} /> }
			{ user && <ProfileSendMail open={openMail} setOpen={setOpenMail} /> }
			{ user && <ProfileAddExperience open={openAddExperience} setOpen={setOpenAddExperience} /> }

			<Container sx={{ my: 3 }} >
				{/*-----[ start coding bellow here ]------*/}

				<Grid container spacing={2} >
					{/*------[ left side ]------*/}
					<Grid item xs={12} sm={4} >
						<Paper sx={{ p: 2 }} >
							<Grid container direction='column' alignItems='center' >
								<IconButton onClick={profileAvatarClickHandler} component='section' >
									<div style={{
										position: 'relative'
									}}>

									<Avatar
										src={user.avatar}
										alt={user.avatar}
										title={user.username || 'user avatar'}
										sx={{ width: 150, height: 150, mb: 1 }}
									/>
									<div style={{
										position: 'absolute',
										bottom: 10,
										left: 0,
									}}>
										<Button
											color='inherit'
											size='small'
											variant='contained'
											startIcon={<EditIcon />}
										>Edit</Button>
									</div>

									</div>
								</IconButton>
								<Typography color='primary' sx={{textTransform: 'capitalize'}} >{user.username}</Typography>
								<Typography variant='caption' >{toCapitalize(user.title) || 'Full Stack Developer'}</Typography>
								<Typography sx={{ mt: 2 }} variant='body2' color='textSecondary' align='justify' paragraph >
									{user.description || description}
								</Typography>
							</Grid>
							<Menu
								open={avatarOpen}
								anchorEl={avatarAnchorEl}
								onClose={avatarMenuCloseHandler}
								anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
							>
								{avatarMenuItems.map(({label, icon}, key, items) => (
									<MenuItem key={key}
										onClick={(evt) => avatarMenuItemHandler(evt, label, items)}
										dense
										divider={ label !== items[items.length - 1].label}
										component={ items[0].label === label ? 'label' : 'li'}
									>
										<ListItemIcon>{icon}</ListItemIcon>
										<ListItemText>{label}</ListItemText>
										{label === items[0].label && <input type='file' accept='image/*' hidden onChange={inputFileChangeHandler} /> }
									</MenuItem>
								))}
							</Menu>

							<Grid container justifyContent='space-between' >
								<Grid item> <Typography variant='h5' >Skills</Typography> </Grid>
								<Grid item>
									<IconButton onClick={profileSkillHandler} >
										<EditIcon fontSize='small' />
									</IconButton>
								</Grid>
							</Grid>
							<Divider sx={{ mb: 2 }} />

							<Grid item container sx={{ gap: 1 }} >
								{user.skills.map(skill => <Button key={skill}
									variant='outlined'
									size='small'
									sx={{ py:.5, px: 2, borderRadius: 4, textTransform: 'Capitalize' }}
								>{skill}</Button> )}
							</Grid>

							<Typography variant='h5' sx={{ mt: 4 }} >Add Notes </Typography>
							<TextField
								placeholder='Add notes for future feference'
								fullWidth
								multiline
								rows={2}
							/>
							<Button
								variant='contained'
								fullWidth
								sx={{ my: 2 }}
							>Add Notes</Button>
						</Paper>
					</Grid>

					{/*------[ Right side ]------*/}
					<Grid item xs={12} sm={8} >
						<Paper sx={{ p: 2, mb: 2 }} >
							<Grid container justifyContent='space-between' >
								<Grid item> <Typography variant='h5' paragraph >Basic Information</Typography> </Grid>
								<Grid item>
									<IconButton onClick={basicEditButtonHandler} >
										<EditIcon fontSize='small' />
									</IconButton>
								</Grid>
							</Grid>
							<Grid container spacing={2} >
								{basic.map(({label, value}, key) => (
									<Grid key={key} item xs={6} md={4} container direction='column' sx={{ overflow: 'hidden' }} >
										<Typography color='textSecondary'>{label}</Typography>
										<Typography variant='body2' >{value}</Typography>
									</Grid>
								))}

								<Grid item sx={{ display: 'flex', gap: 2, my: 3 }}  >
									<Button
										variant='contained'
										sx={{ textTransform: 'Capitalize' }}
										startIcon={<FileDownloadIcon />}
										// component='a' href='/resume.pdf' download
										component='a' href={user.resume} download='resume.pdf'
										>Download Resume</Button>
									<Button
										variant='outlined'
										sx={{ textTransform: 'Capitalize' }}
										onClick={sendMailHandler}
									>Send Mail</Button>
								</Grid>
							</Grid>
						</Paper>


					{/*------[ Right: 2nd block ]------*/}
						<Paper sx={{ p: 2, my: 2 }} >
							<Grid container justifyContent='space-between' >
								<Grid item> <Typography variant='h5' >Experience</Typography> </Grid>
								<Grid item>
									<Button
										variant='contained'
										size='small'
										startIcon={<AddIcon />}
										onClick={experienceAddButtonHandler}
									> Add </Button>
								</Grid>
							</Grid>

							{ experiences.map((item, key) => (
								<Grid key={key} sx={{ my: 3 }}>
									<Grid container direction='row' alignItems='center'>
										{/*----- 1st item (left)	-----*/}
										<Grid item xs>
											<Avatar sx={{width: 70, height: 70, backgroundColor: item.backgroundColor }} >
												{item.title.split(' ').map(word => word[0]).join('').toUpperCase()}
											</Avatar>
										</Grid>

										{/*----- 2nd item (Right)	-----*/}
										<Grid item xs={9} md={10} container direction='column'>
											<Grid container justifyContent='space-between' >
												<Grid item> <Typography color='primary' >{item.title}</Typography> </Grid>
												<Grid item>
													<IconButton onClick={moreVertHandler}>
														<MoreVertIcon />
													</IconButton>
												</Grid>
											</Grid>
											<Typography color='textSecondary' variant='caption'>{item.subheader}</Typography>
											<Typography color='textSecondary' variant='caption'>
											{item.date} - {item.status} | {item.location}</Typography>
										</Grid>
									</Grid>

									<Grid container>
										<Grid item xs> </Grid>
										<Grid item xs={9} md={10}> <Divider sx={{ mt: 1 }} /> </Grid>
									</Grid>
								</Grid>
							))}
						</Paper>
						<Menu
							open={experienceMenuOpen}
							anchorEl={experienceAnchorEl}
							onClose={menuCloseHandler}
						>
							{experiencesInfo.map((item, key, arr) => <MenuItem key={key}
								dense
								divider={item.label !== arr[arr.length - 1].label}
								onClick={(evt) => menuItemHandler(evt, item.label)}
							>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText>{item.label}</ListItemText>
							</MenuItem>
							)}
						</Menu>

					{/*------[ Right: 3rd block ]------*/}
					<Grid sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>Education</AccordionSummary>
								<AccordionDetails>
									<Typography variant='h5' paragraph >Experience</Typography>
								</AccordionDetails>
							</Accordion>

							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>Accomplishment</AccordionSummary>
								<AccordionDetails>
									<Typography variant='h5' paragraph >Experience</Typography>
								</AccordionDetails>
							</Accordion>

							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>Certification</AccordionSummary>
								<AccordionDetails>
									<Typography variant='h5' paragraph >Experience</Typography>
								</AccordionDetails>
							</Accordion>

					</Grid>

					</Grid>
				</Grid>
			</Container>
		</Layout>
	)
}
export default Profile


export const getServerSideProps = (ctx) => {
	const { token } = nookies.get(ctx)

	if(!token) return { redirect: {// NextJS built-in Redirect features
			destination: '/login',
			parmanent: false
		}
	}

	return { props: {} }
}


