
import SearchComponent from '../dashboard/_search'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Header = (props) => {
	const {
		placeholder='Searcing for ...',
		value='',

		keywords=[],
		keyword='',
		setKeyword=f=>f,

		onChange=f=>f,
		onSubmit=f=>f,
		sx={}
	} = props

	return (
		<Box sx={{
			display: 'flex',
			justifyContent: 'space-between',
		}}>
			<Typography variant='h4'> Category products </Typography>
			<SearchComponent
				placeholder={placeholder}
				value={props.value}

				keywords={keywords}
				keyword={keyword}
				setKeyword={setKeyword}

				onChange={onChange}
				onSubmit={onSubmit}
				sx={sx}
			/>
		</Box>
	)
}
export default Header
