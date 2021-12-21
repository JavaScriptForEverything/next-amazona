import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const Header = () => {
	return (
		<Grid container>
			<Grid item xs={12} >
				<Typography variant='h4'> Category products </Typography>
				<Typography variant='body2'>Heade section</Typography>
			</Grid>
		</Grid>
	)
}
export default Header
