import { isEmail } from 'validator'
import Box from '@mui/material/Box'


// Replace every Zero with random number + always return 6 digit long hex code
export const randomHexColor = "#000000".replace(/0/g,() => (~~(Math.random()*16)).toString(16) )


export const catchAsyncDispatch = (fn, showError=f=>f) => (dispatch, getStore) => fn(dispatch, getStore).catch(err => {
	const message = err.response?.data.message || err.message
	dispatch( showError(message) )
	// console.error({message})
})


export const toCapitalize = (str) => str && str.replace(/\b./g, match => match.toUpperCase())









// export const shorter = (content, length=250) => {
// 	if(content.length > length) return content.substr(0, length) + '...'
// 	return content
// }


// // Filter Object By Array
// export const filterObjectByArray = (arr, obj) => {
// 	const tempObj = {}

// 	if( !arr ) return console.log('1st argument should by Array but given ' + typeof arr)
// 	if( !obj ) return console.log('2nd argument should by Object but given ' + typeof obj)

// 	if(arr.constructor !== Array) return console.error('1st argument must by an Array, but given ' + typeof obj )
// 	if(obj.constructor !== Object) return console.error('2nd argument must by an Object, but given ' + typeof obj )

// 	Object.entries(obj).forEach(([key, value]) => {
// 		if( arr.includes(key)	) tempObj[key] = value
// 	})

// 	return tempObj
// }


// used with Tabs + Tab Component
export const TabPanel = ({ children, value, index}) => (
	<Box hidden={value !== index } >
		{children}
	</Box>
)


// Form Validator
export const formValidator = (obj, errorStateUpdateMethod, requireLength=4) => {
	const errorObj = {}

	if( obj.username && obj.username.length < 4)  errorObj.username = 'name reqired 4 digit long'
	if( obj.email && !isEmail(obj.email) ) errorObj.email = 'Invalid Email address'

	if(obj.password && obj.password.length < requireLength ) errorObj.password = `Password must be ${requireLength} character long`
	if(obj.password && obj.confirmPassword && obj.password !== obj.confirmPassword) errorObj.confirmPassword = 'Confirm Password not matched'

	Object.entries(obj).forEach(([key, value]) => {
		if(value.trim() === '')  errorObj[key] = `'${key}' field is empty`
	})

	errorStateUpdateMethod(errorObj)
	return Object.keys(errorObj).every(item => item === '')
	// it should be Object.values() but still works fine
}


export const readAsDataURL = (file, setMethod) => {
	if(!file) return console.error('pass a file as argument')
	if(!setMethod || setMethod.constructor !== Function) {
		return console.error('2nd argument (as setState) required')
	}

	const isImage = file.type.match('image/*')
	if(!isImage) return console.error('You must have to pass image')

	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.addEventListener('load', () => {
		if(reader.readyState === 2) setMethod( reader.result )
	})
}


