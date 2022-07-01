import { useSelector, useDispatch } from 'react-redux'
import { showAlert } from '../store/dialogReducer'

import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

/* 	useEffect(() => {
			if( error) return dispatch( showAlert({ open: true, severity: 'error', message: error, duration: 8000 }) )

			const message = 'Congratulate to becoming a member of our community'  
			if( status == 'success') return dispatch( showAlert({ open: true, message }) )

		}, [error, status]) */ 	
const ShowAlert = () => {
	const dispatch = useDispatch()
	const { open, severity, message, duration  } = useSelector(state => state.dialog)

	const closeHandler = () => dispatch(showAlert({ open: false, message: '' }))

	return (
		<Snackbar
			open={open}
			onClick={closeHandler}
			onClose={closeHandler}
			autoHideDuration={duration}
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
