import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from '../../actions/productActions'
import { useStyles } from '../../styles'
import Progress from '../../components/Progress';
import AlertMessage from '../../components/AlertMessage';

const ProductsListScreen = (props) => {
    const { history } = props

    const classes = useStyles()

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const productDelete = useSelector(state => state.productDelete)
    const { success } = productDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getProducts())
        }
        else {
            history.push('/signin')
        }
    }, [dispatch, userInfo, history, success])

    const deleteHandler = (productID) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(productID))
        }
    }

    return (
        loading
            ? <Progress marginTop={'20%'} />
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
                            >
                                <i className="fas fa-plus"></i> Create Product
                            </Button>
                        </Grid>

                    </Grid>

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
                                        <TableCell align="center">{product.price}</TableCell>
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

                </Container>
    )
}

export default ProductsListScreen
