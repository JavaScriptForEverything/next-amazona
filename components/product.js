
import { toCapitalize, shorter } from '../util'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import FlagIcon from '@mui/icons-material/Flag'
import PersonIcon from '@mui/icons-material/Person'


const CardComponent = ({ tour }) => {

	return(
		<Container maxWidth='xs' disableGutters >
			<Card>
				<CardHeader
					title={toCapitalize(tour.name) }
					subheader={tour.summary}
					action={
						<IconButton aria-label='settings'>
							<MoreVertIcon />
						</IconButton>
					}
				/>
				<CardActionArea
					// onClick = {() => history.push(`tour/${tour.slug}`)}
				>
{/*				{ token && foundYou && foundYou._id === tour._id ? (
						<AddLabelOverImage
							src={`/images/tours/${tour.imageCover}`}
							width='100%'
							text='Added To cart'
							padding={10}
						/>
				) : (
						<CardMedia
							component='img'
							title={`/${tour.slug}`}
							src={`/images/tours/${tour.imageCover}`}
							alt={`/images/tours/${tour.imageCover}`}
						/>
				)}
*/}

				</CardActionArea>
				<CardContent>
					{/*<Typography align='right'> Tour name </Typography>*/}
					<Typography variant='button'paragraph  color='primary'>
						{/*{tour.difficulty} {tour.duration}-days Tour*/}
					</Typography>

					<Typography paragraph align='justify' variant='body1' color='textSecondary' >
						{/*{shorter(tour.description)}*/}
					</Typography>

					<Grid container spacing={4}>
						<Grid item xs={6} sx={{ display: 'flex', alignItems: 'center'}} >
							<LocationOnIcon color='primary' sx={{ mr: 1.5 }} />
							{/*<Typography>{tour.startLocation.description}</Typography>*/}
						</Grid>
						<Grid item xs={6}  sx={{ display: 'flex', alignItems: 'center'}}>
							<CalendarTodayIcon color='primary'  sx={{ mr: 1.5 }} />
							<Typography>
{/*							{
								new Date(tour.startDates[0]).toLocaleString('en-US', {
									month: 'long',
									year: 'numeric'
								})
							}
*/}							</Typography>
						</Grid>
					</Grid>

					<Grid container spacing={4} >
						<Grid item xs={6} sx={{ display: 'flex', alignItems: 'center'}}>
							<FlagIcon color='primary'  sx={{ mr: 1.5 }} />
							<Typography>{tour.startDates.length} Stops </Typography>
						</Grid>
						<Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
							<PersonIcon color='primary'  sx={{ mr: 1.5 }} />
							<Typography> {tour.guides.length} people </Typography>
						</Grid>
					</Grid>

					<Box mt={4} >
						<Grid sx={{ display: 'flex', alignItems: 'stratch', gap: 1.5 }} >
							<Typography component='span' variant='h5' color='primary'> ${tour.price} </Typography>
							<Typography component='span'> per person </Typography>
						</Grid>

						<Grid sx={{ mt: 2 }} >
							<Typography component='span' variant='h5'> {tour.ratingsAverage.toFixed(1)} </Typography>
							<Typography component='span'> Ratings ({tour.ratingsQuantity} reviews) </Typography>
						</Grid>
					</Box>
				</CardContent>

				<CardActions>
					<Grid container justifyContent='flex-end'>
						<Button
							variant='contained'
							color='primary'
							// component={Link}
							to={`tour/${tour.slug}`}
							sx={{ mr: 2, mb: 2 }}
						> Details </Button>
					</Grid>
				</CardActions>
			</Card>
		</Container>
	)
}

