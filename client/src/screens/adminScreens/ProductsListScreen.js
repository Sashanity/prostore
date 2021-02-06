import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct, createProduct } from '../../actions/productActions'
import { useStyles } from '../../styles'
import Progress from '../../components/Progress';
import AlertMessage from '../../components/AlertMessage';
import { PRODUCT_CREATE_RESET } from '../../consts/productsConsts'
import CustomPagination from '../../components/CustomPagination';

const ProductsListScreen = (props) => {
    const { history, match } = props
    const pageNum = match.params.pageNum || 1

    const classes = useStyles()

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { products, loading, error, page, pages } = productList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const productDelete = useSelector(state => state.productDelete)
    const { success: successDelete, loading: loadingDelete, error: errorDelete } = productDelete
    const productCreate = useSelector(state => state.productCreate)
    const { product: newProduct, success: successCreate, loading: loadingCreate, error: errorCreate } = productCreate

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/signin')
        }

        if (successCreate) {
            history.push(`/admin/product/${newProduct._id}/edit`)
        } else {
            dispatch(getProducts('', pageNum))
        }
    }, [dispatch, userInfo, history, successDelete, successCreate, newProduct, pageNum])

    const deleteHandler = (productID) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(productID))
        }
    }
    const createHandler = () => {
        dispatch(createProduct())
    }

    return (
        loading
            ? <Progress marginTop={'20%'} s={200} />
            : error
                ? <AlertMessage sev={'error'}>{error}</AlertMessage>
                : <Container>
                    <Grid container direction='row' alignItems="center" spacing={2}>
                        <Grid item xs>
                            <h1>Products</h1>
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <Button
                                className={classes.button}
                                variant="contained"
                                fullWidth
                                onClick={createHandler}
                            >
                                <i className="fas fa-plus"></i> Create Product
                            </Button>
                        </Grid>

                    </Grid>
                    {loadingCreate && <Progress />}
                    {errorCreate && <AlertMessage sev={'error'}>{errorCreate}</AlertMessage>}
                    {loadingDelete && <Progress />}
                    {errorDelete && <AlertMessage sev={'error'}>{errorDelete}</AlertMessage>}

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">NAME</TableCell>
                                    <TableCell align="center">PRICE</TableCell>
                                    <TableCell align="center">CATEGORY</TableCell>
                                    <TableCell align="center">BRAND</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell component="th" scope="row">{product._id}</TableCell>
                                        <TableCell align="center">{product.name}</TableCell>
                                        <TableCell align="center">${product.price}</TableCell>
                                        <TableCell align="center">{product.category}</TableCell>
                                        <TableCell align="center">{product.brand}</TableCell>
                                        <TableCell align="center">
                                            <Link to={`/admin/product/${product._id}/edit`}>
                                                <Button >
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </Link>
                                            <Button
                                                color="secondary"
                                                onClick={() => deleteHandler(product._id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <CustomPagination
                        pages={pages}
                        page={page}
                        history={history}
                        isAdmin={userInfo.isAdmin}
                    />

                </Container>
    )
}

export default ProductsListScreen
