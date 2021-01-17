import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'

import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
    // acts as constructor in func components
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get(`/api/products`)
            setProducts(data)
        }
        fetchProducts()
    }, [])
    return (
        <>
            <h1>LATEST PRODUCTS</h1>
            <Grid container direction='row' spacing={2} styles={{ flexGrow: 1 }} >
                {products.map((product) => (
                    <Grid key={product._id} item xs={12} md={6} lg={3}>
                        <Product product={product}></Product>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default HomeScreen
