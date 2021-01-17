import React from 'react'
import { Grid } from '@material-ui/core'
import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
    return (
        <>
            <h1>LATEST PRODUCTS</h1>
            <Grid container direction='row' spacing={2} styles={{ flexGrow: 1 }} >
                {products.map((product) => (
                    <Grid item direction='column' xs={12} md={6} lg={3}>
                        <Product product={product}></Product>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default HomeScreen
