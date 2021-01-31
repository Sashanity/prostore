import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, CardMedia, FormControl, Grid, List, ListItem, ListItemText, makeStyles, MenuItem, Select, Typography, } from '@material-ui/core'

import { Link } from 'react-router-dom'
// import Rating from '../components/Rating'

import Progress from '../components/Progress'
import { getProduct, createProduct } from '../actions/productActions'
import AlertMessage from '../components/AlertMessage'
import { useStyles } from '../styles'
import { PRODUCT_ADD_REVIEW_RESET } from '../consts/productsConsts'
import { Rating } from '@material-ui/lab'

const ProductScreen = (props) => {
    const { match, history } = props
    const classes = useStyles()
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')


    // const [product, setProduct] = useState([])
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const productInfo = useSelector(state => state.productInfo)
    const { product, loading, error } = productInfo
    const productReview = useSelector(state => state.productReview)
    const { loading: loadingReview, error: errorReview, success: successReview } = productReview


    useEffect(() => {
        // const fetchProduct = async () => {
        //     const { data } = await axios.get(`/api/products/${match.params.id}`)
        //     setProduct(data)
        // }
        // fetchProduct()
        dispatch(getProduct(match.params.id))
    }, [dispatch, match])

    const handleAddToCart = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const handleChangeQty = (event) => {
        setQty(event.target.value)

    }

    return (
        <>
            <Link to='/'><Button>Go Back</Button></Link>
            {loading
                ? <Progress marginTop={'20%'} />
                : error
                    ? <AlertMessage sev={'error'}>{error}</AlertMessage>
                    : <>
                        <Grid container direction='row' spacing={2}  >
                            <Grid item md={6}>
                                {product.image
                                    ? <CardMedia className={classes.image} image={product.image} />
                                    : <Progress marginTop={'40%'} />
                                }
                            </Grid>
                            <Grid item md={3}>
                                <List>
                                    <ListItem divider><h3>{product.name}</h3></ListItem>
                                    <ListItem divider>
                                        {/* <Rating value={product.rating} text={`${product.numReviews} reviews`} /> */}
                                        <Rating size="small" value={product.rating} readOnly />
                                        <p>{product.numReviews} reviews</p>
                                    </ListItem>

                                    <ListItem divider>
                                        Price: ${product.price}
                                    </ListItem>

                                    <ListItem>
                                        Description: {product.description}
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item md={3}>
                                <Card>
                                    <List >
                                        <ListItem divider>
                                            <Grid container direction='row' justify='space-between' alignItems='center'>
                                                <Grid item xs>Price:</Grid>
                                                <Grid item xs><strong>${product.price}</strong></Grid>
                                            </Grid>
                                        </ListItem>

                                        <ListItem divider>
                                            <Grid container direction='row' justify='space-between' alignItems='center'>
                                                <Grid item xs>Status:</Grid>
                                                <Grid item xs>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Grid>
                                            </Grid>
                                        </ListItem>
                                        {product.countInStock > 0 && (
                                            <ListItem divider>
                                                <Grid container direction='row' justify='space-between' alignItems='center'>
                                                    <Grid item xs>Quantity:</Grid>

                                                    <Grid item xs>
                                                        <FormControl >
                                                            <Select
                                                                labelId="select-qty"
                                                                id="select-qty"
                                                                value={qty}
                                                                onChange={handleChangeQty}
                                                            // onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {
                                                                    [...Array(product.countInStock).keys()].map(c => (

                                                                        <MenuItem key={c + 1} value={c + 1}>{c + 1}</MenuItem>
                                                                        // <option key={c + 1} value={c + 1}>{c + 1}</option>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>

                                            </ListItem>
                                        )}


                                        <ListItem>
                                            <Button
                                                fullWidth
                                                disabled={product.countInStock === 0}
                                                className={product.countInStock > 0 ? classes.button : classes.btndis}
                                                onClick={handleAddToCart}
                                            >
                                                Add to cart</Button>
                                        </ListItem>
                                    </List>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item md={6}>
                                <h2>REVIEWS</h2>
                                {product.numReviews === 0 && <AlertMessage sev={'info'}>No reviews yet</AlertMessage>}
                                <List>
                                    {product.reviews.map((review) => (

                                        <ListItem key={review._id}>







                                            <ListItemText
                                                secondary={
                                                    review.comment}
                                            />

                                        </ListItem>

                                    ))}
                                    <ListItem>
                                        <h2>Add review</h2>

                                    </ListItem>
                                </List>
                            </Grid>

                        </Grid>
                    </>
            }


        </>
    )
}

export default ProductScreen
