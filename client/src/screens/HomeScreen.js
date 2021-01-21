import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid } from '@material-ui/core'

import Product from '../components/Product'
import { getProducts } from '../actions/productActions'


const HomeScreen = () => {
    // // acts as constructor in func components
    // const [products, setProducts] = useState([])

    const dispatch = useDispatch()
    // state.productList comes form the reducer 
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    useEffect(() => {
        // const fetchProducts = async () => {
        //     const { data } = await axios.get(`/api/products`)
        //     setProducts(data)
        // }
        // fetchProducts()
        dispatch(getProducts())

    }, [dispatch])
    return (
        <>
            <h1>LATEST PRODUCTS</h1>
            {loading
                ? <h3>Loading...</h3>
                : error
                    ? <h3>{error}</h3>
                    : <Grid container direction='row' spacing={2} styles={{ flexGrow: 1 }} >
                        {products.map((product) => (
                            <Grid key={product._id} item xs={12} md={6} lg={3}>
                                <Product product={product}></Product>
                            </Grid>
                        ))}
                    </Grid>}

        </>
    )
}

export default HomeScreen
