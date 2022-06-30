import { useState, useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress'

// /layout/index.js
const LinearProgressBar = function() {
	const [ scrollValue, setScrollValue ] = useState(0)

	const scrollHandler = () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement

		const restHeight = scrollHeight - clientHeight 			// => total page hight 	- 	viewable areas height
		let scrolledRatio = scrollTop / restHeight 					// =>
				scrolledRatio = scrolledRatio * 100 								// => 0.3243 => 32.43
				scrolledRatio = parseInt(scrolledRatio) 						// => 32

		setScrollValue(scrolledRatio)
	}



	useEffect(() => {
		window.addEventListener('scroll', scrollHandler)

		// useEffect Cleanup function to solve, so that don't try to update unmounted object.
		return () => window.removeEventListener('scroll', scrollHandler)
	}, [])


	return <LinearProgress variant='determinate' value={scrollValue} />
}
export default LinearProgressBar


