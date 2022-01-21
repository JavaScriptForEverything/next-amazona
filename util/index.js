import { isEmail } from 'validator'
import Box from '@mui/material/Box'


/*
	TextField 	:		onChange={evt => changeHandler(evt, name)}
	Autocomplete:		onChange={(evt, newValue) => changeHandler(evt, name, newValue)}

	const changeHandler = (evt, name, newValue) => {
		setFields({ ...fields, [name]: newValue || evt.target.value })
	}

// => { label: 'fieldLabel', 'name: fieldName', type: 'fieldType', options=['autoComplete', 'options']}
*/
export const arrayObjectCreator = (label, name, type='text', options) => ({label, name, type, options})

// =>  { confirmation: '', status: '', ...  } 			:
// =>  { confirmation: true, status: false, ...  } 	: if passed 2nd arg as property name
// export const getNameFieldOfArrayObject = (arr=[], field ) => {
// 	const tempObj = {}
// 	arr.forEach(obj => tempObj[obj.name] = field ? obj[field] : '')

// 	return tempObj
// }

// Form Validator
export const formValidator = (obj, errorStateUpdateMethod, requireLength=4) => {
	const errorObj = {}

	if( obj.username && obj.username.length < 4)  errorObj.username = 'name reqired 4 digit long'
	if( obj.email && !isEmail(obj.email) ) errorObj.email = 'Invalid Email address'

	if(obj.password && obj.password.length < requireLength ) errorObj.password = `Password must be ${requireLength} character long`
	if(obj.password && obj.confirmPassword && obj.password !== obj.confirmPassword) errorObj.confirmPassword = 'Confirm Password not matched'


	Object.keys(obj).forEach((key) => {
		if(`${obj[key]}`.trim() === '')  errorObj[key] = `'${key}' field is empty`
	})

	errorStateUpdateMethod(errorObj)
	return Object.keys(errorObj).every(item => item === '')
	// it should be Object.values() but still works fine
}

// /file/user.png 	=> 	data:image/jpeg;base64,/9j/4QlQaHR0cDovL25zLmFkb2JlL...
export const readAsDataURL = (file, setMethod, isImage=true) => {
	if(!file) return console.error('pass a file as argument')
	if(!setMethod || setMethod.constructor !== Function) {
		return console.error('2nd argument (as setState) required')
	}

	const image = file.type.match('image/*')
	if(isImage && !image) return console.error('please select only image.')
	if(!isImage && image) return console.error('please don\'t select image.')

	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.addEventListener('load', () => {
		if(reader.readyState === 2) setMethod( reader.result )

		// if(reader.readyState === 2) {
		// 	if(!name) return setMethod(reader.result)
		// 	setMethod( oldValue => ({ ...oldValue, [name]: reader.result }))
		// }
	})
}




export const catchAsyncDispatch = (fn, showError=f=>f) => (dispatch, getStore) => fn(dispatch, getStore).catch(err => {
	const message = err.response?.data.message || err.message
	dispatch( showError(message) )
	// console.error({message})
})


// make word's first character Capitalize
export const toCapitalize = (str) => str && str.replace(/\b./g, match => match.toUpperCase())

// limit description's length
export const shorter = (content, length=250) => {
	if(content.length > length) return content.substr(0, length) + '...'
	return content
}

// copy id's last 8 digits only By start from last 8th chars
export const idFormatter = (id) => `...${id.substr(id.length-8, 8)}`

// format date
export const dateFormatter = (date) => {
	const dateObj = new Date(date)
	return dateObj.toLocaleString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	})
}

// price formatter
export const priceFormatter = (price) => {
	return price.toLocaleString('en-US', {
		style: 'currency',
		currency: 'usd',
	})
}

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


export const filterPush = (router, key, value ) => {
	const search = value ? { [key]: value } : delete router.query[key]
	const query = Object.assign(router.query, search )
	const searchParams = new URLSearchParams( query ).toString()
	router.push(`?${searchParams}`)
}


export const debounce = (callback, delay) => {
	let timer

	return (...args) => {
		if(timer)	clearTimeout(timer)
		timer = setTimeout(() => callback(...args), delay)
		// timer = setTimeout(() => callback.apply(null, args), delay)
	}
}
