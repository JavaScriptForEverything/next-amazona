// import { useSelector } from 'react-redux'
// import { wrapper } from '../store'
// import { getMe } from '../store/productReducer'


import Link from 'next/link'

import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'



const About = () => {
	// const product = useSelector( state => state.product.product )
	console.log( process.env.DB_LOCAL_URL )

	return (
		<>
			<Link href='/' passHref><Button>click</Button></Link>
			<Switch checked={true} />



		</>
	)
}
export default About


// export const getServerSideProps = wrapper.getServerSideProps( (store) => async(context) => {
// 	await store.dispatch(getMe())
// })
