const { readFileSync } = require('fs')
const { resolve } = require('path')
require('dotenv').config() 							// only require for seeder.js file
require('./database')

const Product = require('./productModel')

const file = resolve(__dirname, '../../data/products.json')
let data  = readFileSync(file, 'utf-8')
		data = JSON.parse(data)


const catchAsync = (fn) => (data) => fn(data).catch(err => {
	console.log(err)
	process.exit(1)
})


const importHandler = catchAsync(async (arg) => {
	await Product.deleteMany()
	const products = await Product.create(arg)
	console.log('data imported Successfully')
	process.exit(0)
})
const deleteHandler = catchAsync(async () => {
	await Product.deleteMany()
	console.log('data deleted Successfully')
	process.exit(0)
})
const readHandler = catchAsync(async () => {
	const products = await Product.find()
	console.log( products )
	process.exit(0)
})

const args = process.argv[2]
if(args === '--import') return importHandler(data)
if(args === '--delete') return deleteHandler()
readHandler()



