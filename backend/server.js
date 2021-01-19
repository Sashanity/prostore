//This file is entry point for server

// in node 14.9(6)+, it is opssible to import as ES modules 
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db_config.js'
import products from './data/products.js'

//load config file
dotenv.config()
connectDB()
const app = express()



app.get('/', (req, res) => {
    res.send('Hi, api is runnning :)')
})
app.get('/api/products', (req, res) => {
    res.json(products)
})
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))
