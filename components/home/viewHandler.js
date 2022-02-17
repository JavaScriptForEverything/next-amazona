import { useEffect } from 'react'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

import ListIcon from '@mui/icons-material/List'
import GridIcon from '@mui/icons-material/GridView'

const viewButtons = [
	{ icon: <ListIcon /> },
	{ icon: <GridIcon /> },
]

const View = ({ viewMode=0, setViewMode=f=>f, ...params}) => {

	useEffect(() => setViewMode( +localStorage.getItem('view') || 0 ), [])
	const viewHandler = (key) => () => {
		setViewMode(key)
		localStorage.setItem('view', key)
	}

	return (
		<ButtonGroup {...params}>
			{viewButtons.map(({icon}, key) => <Button key={key}
				variant={key === viewMode ? 'contained' : 'outlined'}
				onClick={viewHandler(key)}
			>{icon}</Button>)}
		</ButtonGroup>
	)
}
export default View
