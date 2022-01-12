import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../../store/productReducer'
import { showAlert } from '../../../store/dialogReducer'
import nookies from 'nookies'

import { humanReadableFileSize, formValidator } from '../../../util'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import CircularProgress from '@mui/material/CircularProgress'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DeleteIcon from '@mui/icons-material/Delete'

const brands = ['niki', 'adidas', 'ramond', 'oliver', 'zara', 'casely']
const categories = ['pant', 'shirt']

const inputItems = [
	{ label: 'Product Name',type: 'text', 	name: 'name' },
	{ label: 'Quantity', 		type: 'number', name: 'quantity' },
	{ label: 'Brand', 			type: 'text', 	name: 'brand', 		options: brands },
	{ label: 'Category', 		type: 'text', 	name: 'category', options: categories },
	{ label: 'Price', 			type: 'number', name: 'price' },
	{ label: 'Description',	type: 'text', 	name: 'description' },
]
const inputItemsObj = {}
inputItems.forEach(item => inputItemsObj[item.name] = '')


const Products = ({ setView=f=>f }) => {
	const dispatch = useDispatch()
	const { token } = nookies.get(null)
	const [ added, setAdded ] = useState(false)

	const [ files, setFiles ] = useState([]) 	// to get Original image
	const [ uploadImages, setUploadImages ] = useState([]) 		// to get image as dataURL

	const [ fields, setFields ] = useState(inputItemsObj)
	const [ fieldsError, setFieldsError ] = useState(inputItemsObj)

	const { loading, error, product } = useSelector(state => state.product)

	useEffect(() => {
		error && dispatch(showAlert({ open: true, severity: 'error', message: error}))
	}, [error])

	useEffect(() => {
		// formValidator(fields, setFieldsError)
	}, [fields, files])

	const onDropHandler = (acceptedFiles) => {
		acceptedFiles.forEach(image => {
			const reader = new FileReader()
			reader.readAsDataURL(image)

			const isImage = image.type.match('image/*')
			if(!isImage) return console.error('You must have to pass image')

			reader.onload = () => {
				if( reader.readyState === 2 ) {
				 setUploadImages(images => [...images, reader.result])
				 setFiles(images => [...images, image])
				}
			}
		})
	}
	const { getRootProps, getInputProps } = useDropzone({
		onDrop: onDropHandler,
		accept: 'image/*, image/png'
	})
	const listItemDeleteHandler = (evt, item, id) => {
		const filteredImages = uploadImages.filter( image => image !== item )
		setUploadImages(filteredImages)
	}

	const changeHandler = (evt, newValue, action, option ) => {
		setFields({
			...fields,
			[evt.target.name]: evt.target.value,
 			[evt.target.id.split('-').shift()]: newValue
		})
		setAdded(false)
	}
	const resetHandler = () => {
		setAdded(false)
		setFields(inputItemsObj)
		setUploadImages([]) 						// clear the images
	}
	const submitHandler = async (evt) => {
		evt.preventDefault()

		const isValidated = formValidator(fields, setFieldsError)
		if(!isValidated) return

		if(!uploadImages.length) return setFieldsError( errors => ({ ...errors, images: 'image field is empty' }))


		await dispatch(addProduct({ ...fields, images: uploadImages }, token))
		await setAdded(true)
	}

	return (
		<>
			<Paper sx={{ p: 2 }}>
				<Box sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 3
				}}>
					<Typography variant='h6' color='primary' >Add Product</Typography>
					<Button variant='outlined' sx={{ textTransform: 'capitalize' }} onClick={() => setView(true)} >View</Button>
				</Box>

				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Paper sx={{p: 2}}>
							<Typography paragraph>Add Image</Typography>

							<Box maxWidth='xs' disableGutters {...getRootProps()} sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 2,
								px: 2,
								py: 5,
								border: '2px dotted #1976d2',
								borderRadius: 2,
								cursor: 'pointer',
								// backgroundColor: theme => theme.palette.action.selected
								backgroundColor: theme => '#1976d211',
								my: 3
							}} >
								<input {...getInputProps()} />
								<Typography color='textSecondary'>Drag an image file here or click</Typography>
								<CloudUploadIcon fontSize='large' />
							</Box>
							<Typography color='error'>{fieldsError.images}</Typography>

							{ uploadImages.map( (file, key) => (
							<List key={key}>
								<ListItem
									selected
									secondaryAction={<IconButton onClick={(evt) => listItemDeleteHandler(evt, file, key)}><DeleteIcon /></IconButton>}
								>
									<ListItemAvatar>
										<Avatar src={file} />
									</ListItemAvatar>

									<ListItemText
										primary={files[key]?.name}
										secondary={files[key]?.size ? humanReadableFileSize(files[key].size) : ''}
									/>
								</ListItem>
							</List>
							))}

						</Paper>
					</Grid>

					<Grid item xs={12} sm={6}>
						<Paper sx={{p: 2}}>
							<Typography paragraph>Product Details </Typography>

							<form noValidate onSubmit={submitHandler}>
							{inputItems.map(({label, type, name, options}, key) => (name === 'category' || name === 'brand') ? (
								<Autocomplete key={key}
									options={options}
									getOptionLabel={option => option}
									renderInput={ params => <TextField {...params}
										label={label}
										placeholder={label}
										type={type}
										fullWidth
										margin='dense'
										InputLabelProps={{ shrink: true }}

										error={!fields[name] || !!fieldsError[name] }
										helperText={fieldsError[name] }
									/>}
									id={name} 									// allow to identify every item : also help to get value dynamically
									// value={options[0]}
									value={fields[name]}
									onChange={changeHandler}
								/>
								) : (
								<TextField key={key}
									label={label}
									placeholder={label}
									type={type}
									fullWidth
									autoFocus={key === 0}
									margin='dense'
									InputLabelProps={{ shrink: true }}
									name={name}
									value={fields[name]}
									onChange={changeHandler}
									multiline
									rows={name === 'description' ? 3 : 1}

									error={!fields[name] || !!fieldsError[name] }
									helperText={fieldsError[name] }
								/>
							))}

								<Box sx={{
									display: 'flex',
									gap: 1,
									justifyContent: 'flex-end',
									my: 2
								}}
								>
									<Button variant='outlined' onClick={resetHandler}>Reset</Button>
									<Button type='submit' variant='contained' disabled={added} >
										{ loading ? <CircularProgress color='inherit' size={24} /> : (
											(added ? 'Added' : 'Add')
										)}
									</Button>
								</Box>
							</form>
						</Paper>
					</Grid>
				</Grid>
			</Paper>

		</>
	)
}
export default Products

