import { useSelector, useDispatch } from 'react-redux'
import { showAlert } from '../store/dialogReducer'

import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'


const ShowAlert = () => {
	const dispatch = useDispatch()
	const { open, severity, message  } = useSelector(state => state.dialog)

	const closeHandler = () => dispatch(showAlert({ open: false }))

	return (
		<Snackbar
			open={open}
			onClick={closeHandler}
			onClose={closeHandler}
			autoHideDuration={3000}
			anchorOrigin={{
				horizontal: 'center',
				vertical: 'top',
			}}
		>
			<Alert
				severity={severity}
			>{message}</Alert>
		</Snackbar>
	)
}
export default ShowAlert
