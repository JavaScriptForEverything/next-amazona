import Comment from '../comment'

import Box from '@mui/material/Box'

const ProductComments = () => {

	return (
		<>
			<Box>
				{[1,3,4].map((comment, index) => <Comment
					key={index}
					data={comment}
				/> )}
			</Box>
		</>
	)
}
export default ProductComments
