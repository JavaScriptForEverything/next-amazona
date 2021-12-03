import { useState } from 'react'
import { useSelector } from 'react-redux'


import Layout from '../../layout'
import { toCapitalize } from '../../util'
import { description } from '../../data/profile'
import StyledAvatar from '../../components/styledAvatar'

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

import FileDownloadIcon from '@mui/icons-material/Download'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const experiencesInfo = [
	// {label: 'create', icon: <AddIcon />},
	{label: 'Update', icon: <EditIcon />},
	{label: 'Delete', icon: <DeleteIcon />}
]



const UserProfile = () => {
	const [ menuOpen, setMenuOpen ] = useState(false)
	const [ anchorEl, setAnchorEl ] = useState()

	const { user } = useSelector(state => state.user)
	// console.log({ ...user, avatar: ''})
	// console.log(user?.skills)

	const menuCloseHandler = () => setMenuOpen(false)
	const moreVertHandler = (evt) => {
		setAnchorEl(evt.currentTarget)
		setMenuOpen(true)
	}
	const menuItemHandler = (evt, menuItem) => {
		menuCloseHandler()

		// edit and delete item
		console.log(menuItem)
	}
	const experienceAddButtonHandler = () => {
		console.log('open a dialog to insert new experience')
	}

	const sendMailHandler = () => {
		console.log('send resume to mail by click on it')
	}

	const basicEditButtonHandler = () => {
		console.log('open a dialog to edit basic info')
	}

	const profileAvatarClickHandler = () => {
		console.log('clicked')
	}

	const basic = [
		{ label: 'Age', value: toCapitalize(user?.age) || '28 Years' },
		{ label: 'Years of Experience', value: toCapitalize(user?.experience)  || '1 Years' },
		{ label: 'Phone', value: user?.phone || '01957500605' },
		{ label: 'CTC', value: '2.5 Lac' },
		{ label: 'Location', value: toCapitalize(`${user?.location.city} ${user?.location.country}`) || 'Dhaka, Bangladesh'  },
		{ label: 'Email', value: user?.email || 'javascriptforeverything@gmail.com'  },
	]
	const experiences = [
		{
			title: 'Pixel Studio',
			subheader: 'Ux/UI Designer',
			date: 'Apr 2010',
			status: 'Present',
			location: 'Dhaka, Bangladesh',
			avatar: 'PS',
			backgroundColor: '#42a5f5'
		},
		{
			title: 'Ramasion Studio',
			subheader: 'Web Designer',
			date: 'May 2017',
			status: 'Present',
			location: 'Dhaka, Bangladesh',
			avatar: 'RS',
			backgroundColor: 'lightPink'
		},
	]

	return (
		<Layout>
			<Container sx={{ my: 3 }} >
				{/*-----[ start coding bellow here ]------*/}

				<Grid container spacing={2} >
					{/*------[ left side ]------*/}
					<Grid item xs={12} sm={4} >
						<Paper sx={{ p: 2 }} >
							<Grid container direction='column' alignItems='center' >
								<StyledAvatar
									src={user?.avatar}
									alt={user?.avatar}
									title={user?.username || 'user avatar'}
									sx={{ width: 150, height: 150, mb: 1 }}
									active={false}
									onClick={profileAvatarClickHandler}
									// onClick={ evt => profileAvatarClickHandler(evt)}
								/>
								<Typography color='primary' sx={{textTransform: 'capitalize'}} >{user?.username}</Typography>
								<Typography variant='caption' >{toCapitalize(user?.title) || 'Full Stack Developer'}</Typography>
								<Typography sx={{ mt: 2 }} variant='body2' color='textSecondary' align='justify' paragraph >
									{user?.description || description}
								</Typography>
							</Grid>

							<Grid container justifyContent='space-between' >
								<Grid item> <Typography variant='h5' >Skills</Typography> </Grid>
								<Grid item>
									<IconButton onClick={basicEditButtonHandler} >
										<EditIcon fontSize='small' />
									</IconButton>
								</Grid>
							</Grid>
							<Divider sx={{ mb: 2 }} />

							<Grid item container sx={{ gap: 1 }} >
								{user?.skills.map(skill => <Button key={skill}
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
										component='a' href='/resume.pdf' download
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
											<Avatar sx={{
												width: 70,
												height: 70,
												// backgroundColor: (theme) => theme.palette.primary.light,
												backgroundColor: item.backgroundColor

											}} >{item.avatar}</Avatar>
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
							open={menuOpen}
							anchorEl={anchorEl}
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
export default UserProfile
