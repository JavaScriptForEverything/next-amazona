import { useDispatch } from 'react-redux'
import { enableView } from '../../../store/dialogReducer'

import Button from '@mui/material/Button'

const Insert = () => {
	const dispatch = useDispatch()

	const clickHandler = () => {
		dispatch(enableView(true))
	}

	return (
		<>
			<Button variant='outlined' onClick={clickHandler} >Done</Button>
		</>
	)
}
export default Insert
