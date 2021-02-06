//This file is entry point for server

// in node 14.9(6)+, it is opssible to import as ES modules 
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db_config.js'
import productRoutes from './routes/product_routes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errHandler } from './middleware/err.js'

//load config file
dotenv.config()
connectDB()
const app = express()

// to accept json data (could use cors)
app.use(express.json());

// log routes in dev mode
process.env.NODE_ENV === 'development' && app.use(morgan('dev'))

// app.get('/', (req, res) => {
//     res.send('Hi, api is runnning :)')
// })
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('Hi, api is runnning :)')
    })
}

app.use(notFound)
app.use(errHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))
