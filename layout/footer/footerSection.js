import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'


const FooterSection = ({ title='', children, dividerColor='black', ...params }) => (
	<Box {...params}>
		<Box>
			<Box sx={{
				display: 'flex',
				gap: 1,
				alignItems: 'center'
			}}>
				<Typography sx={{whiteSpace: 'nowrap'}}> {title} </Typography>
				<Box sx={{
						height: 10,
						width: '100vw',
						backgroundImage: 'repeating-linear-gradient(-45deg, gray 0px 1px, white 2px 3px )'
				}} />
			</Box>

			<Divider variant='fullWidth' sx={{
				borderBottom: `1px dashed ${dividerColor}`,
				mt: 1,
				mb: 2
			}} />
		</Box>

		<Box
		// sx={{ fontSize: '10px'}}
		>
			{children}
		</Box>
	</Box>
)

export default FooterSection
