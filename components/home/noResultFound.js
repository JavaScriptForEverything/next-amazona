import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import SearchIcon from '@mui/icons-material/Search'

const NoResultFound = () => {
	const router = useRouter()

	const searchResult = router.query.search?.split(',')?.pop()

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		}}>
			<Typography variant='h6'>No result for {`"${searchResult}"`} </Typography>
			<SearchIcon sx={{color: '#aaaa', fontSize:150 }} />

			<Typography sx={{fontSize: '.8rem', fontWeight: 'bold'}} paragraph>
				We didn't find anything for {`"${searchResult}"`}
			</Typography>

			<Typography color='textSecondary' sx={{fontSize: '.8rem'}} >
				Please double check the spelling, try a more generic search term, or try other search term.
			</Typography>
		</Box>
	)
}
export default NoResultFound
