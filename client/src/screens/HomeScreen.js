import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid } from '@material-ui/core'

import Product from '../components/Product'
import { getProducts } from '../actions/productActions'
import Progress from '../components/Progress'
import AlertMessage from '../components/AlertMessage'
import CustomPagination from '../components/CustomPagination'


const HomeScreen = (props) => {
    // // acts as constructor in func components
    // const [products, setProducts] = useState([])
    const { match, history } = props
    const keyword = match.params.keyword
    const pageNum = match.params.pageNum || 1

    const dispatch = useDispatch()
    // state.productList comes form the reducer 
    const productList = useSelector(state => state.productList)
    const { products, page, pages, loading, error } = productList
    // console.log('PAGES:', pages)
    useEffect(() => {
        // const fetchProducts = async () => {
        //     const { data } = await axios.get(`/api/products`)
        //     setProducts(data)
        // }
        // fetchProducts()
        dispatch(getProducts(keyword, pageNum))

    }, [dispatch, keyword, pageNum])
    return (
        <>
            <h1>LATEST PRODUCTS</h1>
            {loading
                ? <Progress marginTop={'20%'} />
                : error
                    ? <AlertMessage sev={'error'}>{error}</AlertMessage>
                    : <>
                        <Grid container direction='row' spacing={2} styles={{ flexGrow: 1 }} >
                            {products.map((product) => (
                                <Grid key={product._id} item xs={12} md={6} lg={3}>
                                    <Product product={product}></Product>
                                </Grid>
                            ))}
                        </Grid>
                        <CustomPagination
                            pages={pages}
                            page={page}
                            keyword={keyword ? keyword : ''}
                            history={history}
                        />
                    </>
            }
        </>
    )
}

export default HomeScreen
