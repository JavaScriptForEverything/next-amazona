import { useSelector } from 'react-redux'


import Paper from '@mui/material/Paper'

const Dashboard = () => {
	const { search } = useSelector(state => state.user)

	return (
		<>

			<Paper sx={{ my: 2, px: 2, py: 1 }}>
				{search}
			</Paper>
		</>
	)
}
export default Dashboard
