import { useSelector } from 'react-redux'


import Layout from '../../layout'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'


import FileDownloadIcon from '@mui/icons-material/Download'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { skills, basic, experiences, description } from '../../data/profile'




const UserProfile = () => {
	const { user } = useSelector(state => state.user)
	// console.log(user)

	return (
		<Layout>
			<Container sx={{ my: 3 }} >
				{/*-----[ start coding bellow here ]------*/}

				<Grid container spacing={2} >
					{/*------[ left side ]------*/}
					<Grid item xs={12} sm={4} >
						<Paper sx={{ p: 2 }} >
							<Grid container direction='column' alignItems='center' >
								<Avatar
									src={user?.avatar}
									alt={user?.avatar}
									title={user?.username || 'user avatar'}
									sx={{ width: 150, height: 150, mb: 1 }}
								/>
								<Typography color='primary' sx={{textTransform: 'capitalize'}} >{user?.username}</Typography>
								<Typography variant='caption' >{user?.title || 'Full Stack Developer'}</Typography>
								<Typography sx={{ mt: 2 }} variant='body2' color='textSecondary' align='justify' paragraph >
									{user?.description || description}
								</Typography>
							</Grid>

							<Typography variant='h5' sx={{ mt: 2 }} >Skills</Typography>
							<Divider sx={{ mb: 2 }} />

							<Grid item container sx={{ gap: 1 }} >
								{skills.map(skill => <Button key={skill}
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
							<Typography variant='h5' paragraph >Basic Information</Typography>
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
									<Button variant='outlined'  sx={{ textTransform: 'Capitalize' }} >Send Mail</Button>
								</Grid>
							</Grid>
						</Paper>


					{/*------[ Right: 2nd block ]------*/}
						<Paper sx={{ p: 2, my: 2 }} >
							<Typography variant='h5' paragraph >Experience</Typography>

							{ experiences.map((item, key) => (
								<Grid key={key} sx={{ my: 3 }}>
									<Grid container direction='row' alignItems='center'>
										<Grid item xs>
											<Avatar sx={{
												width: 70,
												height: 70,
												// backgroundColor: (theme) => theme.palette.primary.light,
												backgroundColor: item.backgroundColor

											}} >{item.avatar}</Avatar>
										</Grid>

										<Grid item xs={9} md={10} container direction='column'>
											<Typography color='primary' >{item.title}</Typography>
											<Typography color='textSecondary' variant='caption'>{item.subheader}</Typography>
											<Typography color='textSecondary' variant='caption'>
											{item.date} - {item.status} | {item.location}</Typography>
										</Grid>
									</Grid>

									<Grid container>
										<Grid item xs> </Grid>
										<Grid item xs={9} md={10}> <Divider sx={{ display: 'block' }} /> </Grid>
									</Grid>
								</Grid>
							))}
						</Paper>

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
