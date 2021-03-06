import { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../../store/productReducer'
import { showAlert } from '../../../store/dialogReducer'
import nookies from 'nookies'

import { humanReadableFileSize, arrayObjectCreator, formValidator } from '../../../util'

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
	arrayObjectCreator('Product Name', 'name'),
	arrayObjectCreator('Quantity', 'quantity', 'number'),
	arrayObjectCreator('Brand', 'brand', 'text', brands),
	arrayObjectCreator('Category', 'category', 'text', categories),
	arrayObjectCreator('Size', 'size', 'text', ['xs', 'sm', 'lg', 'xxl']),
	arrayObjectCreator('Price', 'price', 'number'),
	arrayObjectCreator('Summary', 'summary'),
	arrayObjectCreator('Description', 'description'),
]
let inputItemsObj = { images: [], coverImage: '' }
inputItems.forEach(item => inputItemsObj[item.name] = '')


const Products = ({ setView=f=>f }) => {
	const dispatch = useDispatch()
	const { token } = nookies.get(null)
	const [ added, setAdded ] = useState(false)

	const [ files, setFiles ] = useState({
		images: [], 					// to store images javascript File Object
		coverImage: {} 				// to store coverImage javascript File Object
	})

	const [ fields, setFields ] = useState(inputItemsObj)
	const [ fieldsError, setFieldsError ] = useState(inputItemsObj)


	const { loading, error, product } = useSelector(state => state.product)
	// const { loading, product } = useSelector(state => state.product)
	// const error = false

	useEffect(() => {
		error && dispatch(showAlert({ open: true, severity: 'error', message: error}))
	}, [error])



	// uploadImagesDropzoneHandler
	const coverImageDropzoneHandler = (acceptedFiles) => {
		acceptedFiles.forEach(File => {
			const reader = new FileReader()
			reader.readAsDataURL(File)

			const isImage = File.type.match('image/*')
			if(!isImage) return console.error('You must have to pass image')

			reader.onload = () => {
				if( reader.readyState === 2 ) {
				 // setCoverImage(reader.result)
				 setFields({ ...fields, coverImage: reader.result })
				 setFiles({ ...files, coverImage: File })
				}
			}
		})
	}
	const coverImageDropzone = useDropzone({
		onDrop: coverImageDropzoneHandler,
		accept: 'image/*, image/png'
	})

	// uploadImagesDropzoneHandler
	const uploadImagesDropzoneHandler = (acceptedFiles) => {
		acceptedFiles.forEach(File => {
			const reader = new FileReader()
			reader.readAsDataURL(File)

			const isImage = File.type.match('image/*')
			if(!isImage) return console.error('You must have to pass image')

			reader.onload = () => {
				if( reader.readyState === 2 ) {
				 setFields({ ...fields, images: [...fields.images, reader.result]})
				 setFiles({ ...files, images: [...files.images, File]})
				}
			}
		})
	}
	const uploadImagesDropzone = useDropzone({ 				// const { getRootProps, getInputProps } = useDropzone({})
		onDrop: uploadImagesDropzoneHandler,
		accept: 'image/*, image/png'
	})



	const coverImageDeleteHandler = (evt) => {
		setFields({ ...fields, coverImage: '' }) 				// mimic remove image functionality
		console.log({ coverImage: fields.coverImage })
	}
	const imagesDeleteHandler = (evt, item, id) => {
		const images = fields.images?.filter( image => image !== item )
		setFields({ ...fields, images })
	}

	const changeHandler = (evt, name, newValue) => {
		setFields({
			...fields,
			[name]: newValue || evt.target.value,
		})
		setAdded(false)
	}
	const resetHandler = () => {
		setAdded(false)
		setFields(inputItemsObj)
	}
	const submitHandler = async (evt) => {
		evt.preventDefault()

		const isValidated = formValidator(fields, setFieldsError)
		if(!isValidated) return

		if(!fields.images?.length) return setFieldsError( errors => ({ ...errors, images: 'image field is empty' }))


		// console.log(fields)
		await dispatch(addProduct(fields, token))
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
					{/*-------[ Left Side ]-------*/}
					<Grid item xs={12} sm={6}>

						{/*-------[ Cover Images ]-------*/}
						<Paper sx={{p: 2}}>
							<Typography paragraph>Cover Image</Typography>

							<Box maxWidth='xs' disableGutters {...coverImageDropzone.getRootProps()} sx={{
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
								<input {...coverImageDropzone.getInputProps()} />
								<Typography color='textSecondary'>Drag an coverImage file here or click</Typography>
								<CloudUploadIcon fontSize='large' />
							</Box>
							<Typography color='error'>{fieldsError.coverImage}</Typography>

							{ fields.coverImage && <List>
								<ListItem
									selected
									secondaryAction={<IconButton onClick={coverImageDeleteHandler}><DeleteIcon /></IconButton>}
								>
									<ListItemAvatar>
										<Avatar src={fields.coverImage} />
									</ListItemAvatar>

									<ListItemText
										primary={files.coverImage?.name}
										secondary={files.coverImage?.size ? humanReadableFileSize(files.coverImage.size) : ''}
									/>
								</ListItem>
							</List>}
						</Paper>


						{/*-------[ images ]-------*/}
						<Paper sx={{p: 2}}>
							<Typography paragraph>Add Images</Typography>

							<Box maxWidth='xs' disableGutters {...uploadImagesDropzone.getRootProps()} sx={{
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
								<input {...uploadImagesDropzone.getInputProps()} />
								<Typography color='textSecondary'>Drag an image file here or click</Typography>
								<CloudUploadIcon fontSize='large' />
							</Box>
							<Typography color='error'>{fieldsError.images}</Typography>

							{ fields.images?.map( (file, key) => (
							<List key={key}>
								<ListItem
									selected
									secondaryAction={<IconButton onClick={(evt) => imagesDeleteHandler(evt, file, key)}><DeleteIcon /></IconButton>}
								>
									<ListItemAvatar>
										<Avatar src={file} />
									</ListItemAvatar>

									<ListItemText
										primary={files.images?.[key]?.name}
										secondary={files.images?.[key]?.size ? humanReadableFileSize(files.images?.[key].size) : ''}
									/>
								</ListItem>
							</List>
							))}
						</Paper>
					</Grid>

					{/*-------[ Right Side ]-------*/}
					<Grid item xs={12} sm={6}>
						<Paper sx={{p: 2}}>
							<Typography paragraph>Product Details </Typography>

							<form noValidate onSubmit={submitHandler}>
							{inputItems.map(({label, type, name, options}, key) => options?.length ? (
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
									value={fields[name]}
									onChange={(evt, newValue) => changeHandler(evt, name, newValue)}
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
									value={fields[name]}
									onChange={(evt) => changeHandler(evt, name)}
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
									<Button type='submit' variant='contained'
										color={error ? 'error' : 'primary'}
										disabled={error ? false : added}
									>
										{ loading ? <CircularProgress color='inherit' size={24} /> : (
											(error ? 'Error' : (added ? 'Added' : 'Add'))
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

