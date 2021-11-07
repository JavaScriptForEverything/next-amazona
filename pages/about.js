// import { useSelector } from 'react-redux'
// import { wrapper } from '../store'
// import { getMe } from '../store/productReducer'


import Link from 'next/link'

import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'



const About = () => {
	// const product = useSelector( state => state.product.product )

	return (
		<>
			<Link href='/' passHref><Button>click</Button></Link>

			<Badge
				badgeContent={432}
				// color='error'
				// variant='standard'
			>
				<Button>List</Button>
			</Badge>


		</>
	)
}
export default About


// export const getServerSideProps = wrapper.getServerSideProps( (store) => async(context) => {
// 	await store.dispatch(getMe())
// })
