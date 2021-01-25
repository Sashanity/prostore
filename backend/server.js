//This file is entry point for server

// in node 14.9(6)+, it is opssible to import as ES modules 
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db_config.js'
import productRoutes from './routes/product_routes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errHandler } from './middleware/err.js'

//load config file
dotenv.config()
connectDB()
const app = express()

// to accept json data (could use cors)
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hi, api is runnning :)')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))
