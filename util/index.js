import { isEmail } from 'validator'
import Box from '@mui/material/Box'




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
		if(`${value}`.trim() === '')  errorObj[key] = `'${key}' field is empty`
	})

	errorStateUpdateMethod(errorObj)
	return Object.keys(errorObj).every(item => item === '')
	// it should be Object.values() but still works fine
}


export const readAsDataURL = (file, setMethod, isImage=true) => {
	if(!file) return console.error('pass a file as argument')
	if(!setMethod || setMethod.constructor !== Function) {
		return console.error('2nd argument (as setState) required')
	}

	if(isImage) {
		const image = file.type.match('image/*')
		if(!image) return console.error('You must have to pass image')
	}

	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.addEventListener('load', () => {
		if(reader.readyState === 2) setMethod( reader.result )
	})
}


// File Size
export const humanReadableFileSize = (bytes, si=true, dp=1) => {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}

// console.log(humanReadableFileSize(1551859712))  // 1.4 GiB
// console.log(humanReadableFileSize(5000, true))  // 5.0 kB
// console.log(humanReadableFileSize(5000, false))  // 4.9 KiB
// console.log(humanReadableFileSize(-10000000000000000000000000000))  // -8271.8 YiB
// console.log(humanReadableFileSize(999949, true))  // 999.9 kB
// console.log(humanReadableFileSize(999950, true))  // 1.0 MB
// console.log(humanReadableFileSize(999950, true, 2))  // 999.95 kB
// console.log(humanReadableFileSize(999500, true, 0))  // 1 MB
