import React from 'react'
import { Grid } from '@material-ui/core'
import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
    return (
        <>
            <h1>LATEST PRODUCTS</h1>
            <Grid container direction="row">
                {products.map((product) => (
                    <Grid item xs={3}>
                        <Product product={product}></Product>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default HomeScreen
