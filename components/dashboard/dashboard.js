import { useSelector } from 'react-redux'

import Search from '../search'

import Paper from '@mui/material/Paper'

const Dashboard = () => {
	const { search } = useSelector(state => state.user)

	return (
		<>
			<Paper sx={{ p: 2 }}>
				<Search />
			</Paper>

			<Paper sx={{ my: 2, px: 2, py: 1 }}>
				{search}
			</Paper>
		</>
	)
}
export default Dashboard
