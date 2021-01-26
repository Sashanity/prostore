// This script adds/destroys local data to the mongodb instance
// npm run data:import

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from '../config/db_config.js'

// models
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

// local data
import users from '../data/users.js'
import products from '../data/products.js'

dotenv.config()
connectDB()

const importData = async () => {
    try {
        // clear first
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        // import 
        const importedUsers = await User.insertMany(users)

        // 0 because it's known the first user in the users.js is admin
        const adminUser = importedUsers[0]._id
        const importedProducts = products.map(p => {
            return { ...p, user: adminUser }
        })
        await Product.insertMany(importedProducts)
        console.log('Success! Data Imported')
        process.exit()
    } catch (error) {
        console.log(`Something went wrong! Error: ${error.message}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Success! Data Destroyed')
        process.exit()
    } catch (error) {
        console.log(`Something went wrong! Error: ${error.message}`)
        process.exit(1)
    }
}

// node backend/seeder -d 
// ^^ call seeder to destroy data
process.argv[2] === '-d' ? destroyData() : importData()


