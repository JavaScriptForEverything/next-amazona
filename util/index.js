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
export const getKeysOfArrayObject = (arr=[], field ) => {
	const tempObj = {}
	arr.forEach( (obj, index) => tempObj[obj.name] = field ? obj[field] : '')

	return tempObj
}


/* 	if( !formValidator(fields, setFieldsError)) return 
		dispatch(loginUser(fields)) */ 	
export const formValidator = (fields, setFieldsError) => {
  const { email, password, confirmPassword } = fields || {}
  const tempObj = {}

  if( email && !isEmail(email) ) tempObj.email = `(${email}) is invalid email address`
  if(confirmPassword && confirmPassword !== password) tempObj.confirmPassword = 'password and confirmPassword not matched'
  if(password?.length < 4) tempObj.password = 'password field must be atleast 4 charecter long'
  

  Object.keys(fields).forEach(field => {
		if( field.endsWith('on') ) return 	// to ignore 'is_password_on' .... like fields

    if( !fields[field] ) tempObj[field] = `${field} field is empty`
  })
  
  setFieldsError(tempObj)
  return Object.keys(tempObj).every(field => field === '')
}



/* 	const { error } = readAsDataURL(file, setAvatar, { pdf: true })
		const { error } = readAsDataURL(file, setAvatar, { pdf: false })
		const { error } = readAsDataURL(file, setAvatar) */ 
export const readAsDataURL = (file, setValue=f=>f, {pdf = false}={} ) => {
  let error = ''

  const isImage = file.type.match('image/(jpeg|png)')?.[1]
  if(!pdf) error = !isImage ? 'Only "jpg/jpeg" or "png" image allowed' : ''
  
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    if(reader.readyState === 2) {
			setValue({ secure_url: reader.result, size: file.size })
		}
  }

  return { error }
}






export const catchAsyncDispatch = (fn, showError) => (dispatch, getStore) => {
	return fn(dispatch, getStore).catch(err => {
		const message = err.response?.data.message || err.message
		dispatch( showError(message) )
	})
}


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
	// router.push(`?${searchParams}`)
	router.push(`?${searchParams}`, undefined, { shallow: true })
}


export const debounce = (callback, delay) => {
	let timer

	return (...args) => {
		if(timer)	clearTimeout(timer)
		timer = setTimeout(() => callback(...args), delay)
		// timer = setTimeout(() => callback.apply(null, args), delay)
	}
}
