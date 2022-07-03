import { wrapper } from '../../store'
import { useRouter } from 'next/router'
import { verify } from 'jsonwebtoken'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, experienceFeature, editFeature, getUser, authenticateUser } from '../../store/userReducer'

import Layout from '../../layout'
import { toCapitalize, readAsDataURL } from '../../util'
import { description } from '../../data/profile'
import ProfileSkills from '../../components/dialog/profile/skills'
import ProfileBasicInfo from '../../components/dialog/profile/basicInfo'
import ProfileSendMail from '../../components/dialog/profile/sendMail'
import ProfileAddExperience from '../../components/dialog/profile/addExperience'
import ProfileEdit from '../../components/dialog/profile/edit'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'


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
	const router = useRouter()
	const dispatch = useDispatch()

	const [ avatarOpen, setAvatarOpen ] = useState(false)
	const [ avatarAnchorEl, setAvatarAnchorEl ] = useState()
	const [ avatarFile, setAvatarFile ] = useState()
	const [ uploadAvatar, setUploadAvatar ] = useState(false)

	const [ experienceMenuOpen, setExperienceMenuOpen ] = useState(false)
	const [ experienceAnchorEl, setExperienceAnchorEl ] = useState()

	const [ openSkill, setOpenSkill ] = useState(false) 	// profile Skill handler
	const [ openBasic, setOpenBasic ] = useState(false) 	// profile Basic Info handler
	const [ openMail, setOpenMail ] = useState(false) 		// profile Send Mail Button handler
	const [ openAddExperience, setOpenAddExperience ] = useState(false) 	// profile Experience button handler
	const [ experienceId, setExperienceId ] = useState(0) 								// to pass experienceId to AddExpreience Form

	const [ openEdit, setOpenEdit ] = useState(false) 								// to pass experienceId to AddExpreience Form

	const { user, isExperienceAdd, edit } = useSelector(state => state.user)
	// console.log({ resume: user.resume })
	// console.log({ url: router })

	const basic = [
		{ label: 'Age', value: user.age  },
		{ label: 'Years of Experience', value: user?.experience },
		{ label: 'Phone', value: user.phone },
		{ label: 'CTC', value: user.ctc },
		{ label: 'Location', value: user.location && toCapitalize(`${user.location.city} ${user.location.country}`)  },
		{ label: 'Email', value: user.email },
	]

	// update/delete avatar here
	useEffect(() => {
		if( uploadAvatar) { 	// use await so that setUploadAvatar set value after 	dispatch(updateProfile(...))
			dispatch(updateProfile({ avatar: avatarFile })) 	// update avatar in store + in Database
			setUploadAvatar(false)
			setAvatarOpen(false)
		}
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
		setUploadAvatar(true)
	}


	// Experience Items: 		MoreVertIcon
	const menuCloseHandler = () => setExperienceMenuOpen(false)
	const moreVertHandler = (evt) => {
		setExperienceAnchorEl(evt.currentTarget)
		setExperienceMenuOpen(true)
		setExperienceId( evt.currentTarget.dataset.experienceId ) 	// need to update experience by id
	}
	const menuItemHandler = (evt, menuItem ) => {
		menuCloseHandler() 		// Close menuItem popup

		if(menuItem === 'Update') { 	// Handle Menu Update Here
			setOpenAddExperience(true)
			dispatch(experienceFeature(false)) 			// Enable UpdateExperienceForm
		}
		if(menuItem === 'Delete') { 	// Handle Menu Delele Here
			dispatch(updateProfile({ experiences: user?.experiences.filter(item => item._id !== experienceId)}))
		}
	}

	const profileSkillHandler = () => setOpenSkill(true)
	const basicEditButtonHandler = () => setOpenBasic(true)
	const sendMailHandler = () => setOpenMail(true)
	const experienceAddButtonHandler = () => {
		setOpenAddExperience(true)
		dispatch(experienceFeature(true)) 				// Enable AddExperienceForm
	}


	const usernameHandler = (evt) => {
		setOpenEdit(true)
		dispatch(editFeature('username'))
	}
	const titleHandler = (evt) => {
		setOpenEdit(true)
		dispatch(editFeature('title'))
	}
	const descriptionHandler = (evt) => {
		setOpenEdit(true)
		dispatch(editFeature('description'))
	}

	return (
		<Layout title={`Profile Page | ${user.username} `}>

			{/*-----[ dialog/models ]------*/}
			{ user && <ProfileSkills open={openSkill} setOpen={setOpenSkill} /> }
			{ user && <ProfileBasicInfo open={openBasic} setOpen={setOpenBasic} /> }
			{ user && <ProfileSendMail open={openMail} setOpen={setOpenMail} /> }
			{ user && <ProfileAddExperience open={openAddExperience} setOpen={setOpenAddExperience} experienceId={experienceId} /> }
			{ user && <ProfileEdit open={openEdit} setOpen={setOpenEdit} /> }

			{/*<Container sx={{ my: 3 }} >*/}
			<Container>
				{/*-----[ start coding bellow here ]------*/}

				<Grid container spacing={2} >
					{/*------[ left side ]------*/}
					<Grid item xs={12} sm={4} >
						<Paper sx={{ p: 2 }} >
							<Grid container direction='column' alignItems='center' >
								<IconButton onClick={profileAvatarClickHandler} component='section' >
									<div style={{position: 'relative'}}>
										{uploadAvatar ? <CircularProgress size={150} thickness={.5} disableShrink /> : (
											<Avatar
												src={user.avatar ? user.avatar.secure_url : ''}
												alt={user.avatar ? user.avatar.secure_url : ''}
												title={user.username}
												sx={{ width: 150, height: 150, mb: 1 }}
											/>
										)}
										<div style={{position: 'absolute', bottom: 10, left: 0, }}>
											<Button
												color='inherit'
												size='small'
												variant='contained'
												startIcon={<EditIcon />}
											>Edit</Button>
										</div>
									</div>
								</IconButton>

								<Typography color='primary' sx={{textTransform: 'capitalize'}}
									title='Double Click to Edit'
									onDoubleClick={usernameHandler}
								>{user.username}</Typography>
								<Typography variant='caption'
									title='Double Click to Edit'
									onDoubleClick={titleHandler}
								>{toCapitalize(user.title) || 'Full Stack Developer'}</Typography>
								<Typography sx={{ mt: 2 }} variant='body2' color='textSecondary' align='justify' paragraph
									title='Double Click to Edit'
									onDoubleClick={descriptionHandler}
								>
									{user.description || description }
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
										disabled={user.avatar && key === 0 ? true : false}
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
								{user?.skills?.map(skill => <Button key={skill}
									variant='outlined'
									size='small'
									sx={{ py:.5, px: 2, borderRadius: 4, textTransform: 'Capitalize' }}
								>{skill}</Button> )}
							</Grid>

							<Typography variant='h5' sx={{ mt: 4 }} >Add Notes </Typography>
							<form onSubmit={() => 0}>
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
									type='submit'
								>Add Notes</Button>
							</form>
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
										component='a' href={user.resume} download='resume.pdf'
										disabled={!user.resume }
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

							{ user?.experiences?.map((item, key) => (
								<Grid key={key} sx={{ my: 3 }}>
									<Grid container direction='row' alignItems='center'>
										{/*----- 1st item (left)	-----*/}
										<Grid item xs>
											<Avatar sx={{width: 70, height: 70, backgroundColor: item.logoBackgroundColor }} >
												{item.companyName?.split(' ')?.map(word => word[0]).join('').toUpperCase()}
											</Avatar>
										</Grid>


										{/*----- 2nd item (Right)	-----*/}
										<Grid item xs={9} md={10} container direction='column'>
											<Grid container justifyContent='space-between' >
												<Grid item> <Typography color='primary' >{toCapitalize(item.companyName)}</Typography> </Grid>
												<Grid item>
													<IconButton onClick={moreVertHandler} data-experience-id={item._id} >
														<MoreVertIcon />
													</IconButton>
												</Grid>
											</Grid>
											<Typography variant='caption'>{toCapitalize(item.title)}</Typography>
											<Typography color='textSecondary' variant='caption'>
											{new Date(item.joiningDate).toLocaleString('en-us', {
													year: 'numeric',
													month: 'short'
												})
											} - {item.currentStatus} | {item.jobLocation}</Typography>
										</Grid>
									</Grid>

									<Grid container>
										<Grid item xs> </Grid>
										<Grid item xs={9} md={10}> <Divider sx={{ mt: 1 }} /> </Grid>
									</Grid>

								</Grid>
							))}
						</Paper>

					{/*---------[ Allow menu item to access item._id ]---------*/}
						<Menu
							open={experienceMenuOpen}
							anchorEl={experienceAnchorEl}
							onClose={menuCloseHandler}
						>
							{experiencesInfo.map((menuItem, key, arr) => <MenuItem key={key}
								dense
								divider={menuItem.label !== arr[arr.length - 1].label}
								// data-experience-id={item._id} 	// user.experiences.map((item....))
								onClick={(evt) => menuItemHandler(evt, menuItem.label)}
							>
								<ListItemIcon>{menuItem.icon}</ListItemIcon>
								<ListItemText>{menuItem.label}</ListItemText>
							</MenuItem>
							)}
						</Menu>


					{/*------[ Right: 3rd block ]------*/}
					<Grid sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >

						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>Certification</AccordionSummary>
							<AccordionDetails>
								<Typography variant='h5' paragraph >Certificate</Typography>
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


// export const getServerSideProps = ({ req }) => {
// 	const { token } = req.cookies
// 	// console.log({ token })

// 	const { TOKEN_SALT } = process.env || {}
// 	// console.log({ TOKEN_SALT })

// 	// const { _id, iat } = verify(token, TOKEN_SALT)
// 	// console.log({ _id, iat })

// 	try {
// 		const { _id, iat } = verify(token, TOKEN_SALT)
// 		// dispatch(authenticateUser(true)) 		
// 		console.log({ _id, iat })

// 	} catch (err) {
// 		console.log(err.message)
// 		// dispatch(authenticateUser(false)) 		

// 		return { redirect: { 	// NextJS built-in Redirect features
// 				destination: '/login',
// 				parmanent: false
// 			}
// 		}
// 	}

// 	return { props: {} }
// }


export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => ({ req }) => {
	const { token } = req.cookies || {}
	const { TOKEN_SALT } = process.env || {}

	try {
		const { _id, iat } = verify(token, TOKEN_SALT)
		dispatch(authenticateUser(true)) 		
		// dispatch(getUserById(_id)) 			// called it in /login
		// console.log({ _id, iat })

	} catch (err) {
		console.log(err.message)
		dispatch(authenticateUser(false)) 		

		return { redirect: { 	// NextJS built-in Redirect features
				destination: '/login',
				parmanent: false
			}
		}
	}
})
