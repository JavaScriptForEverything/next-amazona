const { readFileSync } 	= require('fs')
const { resolve } 			= require('path')
require('dotenv').config() 							// only require for seeder.js file
require('./database')

const Product = require('./productModel')
const User 		= require('./userModel')

let products = resolve(__dirname, '../../data/products.json')
    products = readFileSync(products, 'utf-8')
		products = JSON.parse(products)


let users = resolve(__dirname, '../../data/users.json')
    users = readFileSync(users, 'utf-8')
		users = JSON.parse(users)


const catchAsync = (fn) => (productArg, userArg) => fn(productArg, userArg).catch(err => {
	console.log(err)
	process.exit(1)
})


const importHandler = catchAsync(async (productsData, usersData) => {
	await Product.deleteMany()
	await Product.create(productsData)

	await User.deleteMany()
	await User.create(usersData)

	console.log('data imported Successfully')
	process.exit(0)
})
const deleteHandler = catchAsync(async () => {
	await Product.deleteMany()
	await User.deleteMany()
	console.log('data deleted Successfully')
	process.exit(0)
})
const readHandler = catchAsync(async () => {
	const products = await Product.find()
	const users = await User.find()
	console.log({ products, users })
	process.exit(0)
})

const args = process.argv[2]
if(args === '--import') return importHandler(products, users)
if(args === '--delete') return deleteHandler()
readHandler()



