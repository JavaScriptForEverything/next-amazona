import nookies from 'nookies'
import { useState } from 'react'
import axios from 'axios'

import { readAsDataURL } from '../../util'
import Layout from '../../layout'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Account = () => {
	const [ file, setFile ] = useState('')
	const { token } = nookies.get(null)


	const changeHandler = (evt) => {
		readAsDataURL(evt.target.files[0], setFile)
	}

	const submitHandler = async (evt) => {
		evt.preventDefault()

		const { data: { doc } } = await axios.post('/api/users', { file } , { headers: { Authorization: `Bearer ${token}` }})

		console.log(doc)
	}

	return (
		<Layout>
			<Typography>Account Page</Typography>
			<br /> <br />

			<form onSubmit={submitHandler}>
				<TextField
					label='Upload File'
					InputLabelProps={{ shrink: true }}
					type='file'
					// value={file}
					onChange={changeHandler}
				/>
				<br />
				<Button type='submit' variant='contained'>Upload</Button>
			</form>



		</Layout>
	)
}
export default Account


export const getServerSideProps = (ctx) => {
	const { token } = nookies.get(ctx)

	if(!token) return { redirect: { 		// NextJS built-in Redirect features
			destination: '/login',
			parmanent: false
		}
	}

	return { props: {} }
}


