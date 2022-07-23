import Image from 'next/image'
import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import { likeComment, dislikeComment, toAnswerComment } from '../store/reviewReducer'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Rating from '@mui/material/Rating'
import MuiLink from '@mui/material/Link'
import Divider from '@mui/material/Divider'

import StarIcon from '@mui/icons-material/Star'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'

const Comment = ({ data }) => {
	const dispatch = useDispatch()
	const { like, dislike, totalLikes, totalDislikes } = useSelector( state => state.review )
	const { user } = useSelector( state => state.user )

	// console.log({ like, dislike })

	const likeHandler = () => {
		// if(dislike) return
		dispatch(likeComment())

	}
	const dislikeHandler = () => {
		// if(like) return
		dispatch(dislikeComment())
	}
	const toAnswerHandler = () => {
		// if(like) return
		dispatch(toAnswerComment())
	}

	const commentStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: 2,
	}

	return (
		<Box>
			<Box sx={{...commentStyle, mb: 1 }}>

			<Link href={`?userId=${user._id}`} passHref>
				<MuiLink>
				<Avatar>
					{ user.avatar && <Image
						src={user.avatar.secure_url}
						layout='fill'
				 	/>}
				</Avatar>
				</MuiLink>
			</Link>

				<Typography> Riajul Islam </Typography>
			</Box>

			<Box sx={{...commentStyle, mb: 1 }}>
				<Rating
					name='comment'
					precision={.2}
					defaultValue={4.4}
					readOnly
					icon={<StarIcon color='success' />}
				/>
			<Typography variant='body2' color='textSecondary'>
			 {new Date().toLocaleDateString()}
			</Typography>
			</Box>

			<Typography variant='body2' color='textSecondary' align='justify'>
				Lorem, ipsum, dolor sit amet consectetur adipisicing elit. Quos, similique porro perspiciatis dolores ipsa reiciendis eveniet est maiores necessitatibus quidem quasi dolor eos sint. Perferendis ipsa ad, voluptatibus ut totam?
			</Typography>


			<Box sx={{
				...commentStyle,
				my: 1
			}}>
				<Box sx={{...commentStyle, gap: .1 }}>
					<IconButton onClick={likeHandler} disabled={like > 0 }>
						<ThumbUpOffAltIcon />
					</IconButton>
					<Typography> {totalLikes} </Typography>
				</Box>

				<Box sx={{...commentStyle, gap: .1 }}>
					<IconButton onClick={dislikeHandler} disabled={dislike > 0}>
						<ThumbDownOffAltIcon />
					</IconButton>
					<Typography> {totalDislikes} </Typography>
				</Box>

				<Button onClick={toAnswerHandler}>To Answer</Button>
			</Box>

			<Divider sx={{ mb: 4 }} />

		</Box>
	)
}
export default Comment
