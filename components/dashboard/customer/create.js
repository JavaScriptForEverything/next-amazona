import Button from '@mui/material/Button'

const Create = ({ setView }) => {
	return (
		<>
			<Button variant='outlined' onClick={() => setView(true)} >Done</Button>
		</>
	)
}
export default Create
