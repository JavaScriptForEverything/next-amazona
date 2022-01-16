

import Typography from '@mui/material/Typography'

const Graph = ({ title, value, graph }) => {

	return (
		<>
			<Typography color='textSecondary'>{title}</Typography>
			<Typography variant='h6' paragraph> ${value.toFixed(2)} </Typography>
			<Typography> {graph} </Typography>
		</>
	)
}
export default Graph
