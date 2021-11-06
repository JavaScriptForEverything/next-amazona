import { createTheme } from '@mui/material/styles'

const theme = (darkMode) => createTheme({
	typography: {
		// h1: {
		// 	fontSize: '1rem',
		// }
	},
	palette: {
		mode: darkMode ? 'dark' : 'light', 					// light or dark 	to enable dark or light mode
		// primary: {
		// 	main: '#f0c000'
		// },
		// secondary: {
		// 	main: '#208080'
		// }
	}
})

export default theme
