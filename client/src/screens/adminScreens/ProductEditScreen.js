import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core'

import { useStyles } from '../../styles'
import { getProduct, editProductAdmin } from '../../actions/productActions'
import AlertMessage from '../../components/AlertMessage'
import Progress from '../../components/Progress'
import { PRODUCT_EDIT_RESET } from '../../consts/productsConsts'

export default function ProductEditScreen(props) {
    const { history, location, match } = props
    const productID = match.params.id
    const classes = useStyles()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const productInfo = useSelector(state => state.productInfo)
    const { product, loading, error } = productInfo
    const productEdit = useSelector(state => state.productEdit)
    const { success: successEdit, loading: loadingEdit, error: errorEdit } = productEdit

    const dispatch = useDispatch()

    useEffect(() => {
        if (successEdit) {
            dispatch({ type: PRODUCT_EDIT_RESET })
            history.push('/signin?redirect=/admin/products')
        }
        else {
            if (!product || product._id !== productID) {
                dispatch(getProduct(productID))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }


    }, [history, dispatch, product, productID, successEdit])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editProductAdmin({ _id: productID, name, price, image, brand, category, countInStock, description }))

    }

    return (
        <>
            <Link to='/admin/products'><Button>Go Back</Button></Link>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <i className='fas fa-edit'></i>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Product
        </Typography>

                    {error && <AlertMessage sev={'error'}>{error}</AlertMessage>}
                    {loading && <Progress />}
                    {loadingEdit && <Progress />}
                    {errorEdit && <AlertMessage sev={'error'}>{errorEdit}</AlertMessage>}

                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="name"
                                    name="Name"
                                    variant="outlined"
                                    fullWidth
                                    id="Name"
                                    label=" Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="price"
                                    label="price"
                                    name="price"
                                    type='number'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="image"
                                    label="image"
                                    name="image"
                                    type='text'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="brand"
                                    label="brand"
                                    name="brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="count instock"
                                    label="count in stock"
                                    name="count instock"
                                    type='number'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="category"
                                    label="category"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size='medium'
                                    variant="outlined"
                                    fullWidth
                                    id="description"
                                    label="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>


                        </Grid>

                        <br></br>
                        <Button
                            type="submit"
                            fullWidth
                            className={classes.button}
                            onClick={submitHandler}
                        >
                            Submit Changes
                    </Button>

                    </form>
                </div>

            </Container>
        </>
    );
}