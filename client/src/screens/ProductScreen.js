import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, CardMedia, FormControl, FormControlLabel, FormGroup, Grid, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, MenuItem, Select, TextareaAutosize, Typography, } from '@material-ui/core'

import { Link } from 'react-router-dom'
// import Rating from '../components/Rating'

import Progress from '../components/Progress'
import { getProduct, createProduct, addReview } from '../actions/productActions'
import AlertMessage from '../components/AlertMessage'
import { useStyles } from '../styles'
import { PRODUCT_REVIEW_RESET } from '../consts/productsConsts'
import { Rating } from '@material-ui/lab'

const ProductScreen = (props) => {
    const { match, history } = props
    const classes = useStyles()
    const [qty, setQty] = useState(1)
    const [review, setReview] = useState(false)
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')
    // const [value, setValue] = useState(null);


    // const [product, setProduct] = useState([])
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const productInfo = useSelector(state => state.productInfo)
    const { product, loading, error } = productInfo
    const productReview = useSelector(state => state.productReview)
    const { loading: loadingReview, error: errorReview, success: successReview } = productReview


    useEffect(() => {
        if (successReview) {
            alert('Your review submitted')
            setComment('')
            setRating(0)
            setReview(false)
            dispatch({ type: PRODUCT_REVIEW_RESET })
        }


        dispatch(getProduct(match.params.id))
    }, [dispatch, match, successReview])

    const handleAddToCart = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const handleChangeQty = (event) => {
        setQty(event.target.value)
    }

    const handleWriteToggle = () => {
        if (!userInfo)
            history.push('/signin')
        setReview((review) => !review)
    }
    const submitReviewHandler = (e) => {
        e.preventDefault()
        if (!userInfo)
            history.push('/signin')
        console.log('trying to submit')
        console.log('rating:', rating)
        console.log('comment:', comment)

        dispatch(addReview(match.params.id, { rating, comment }))
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
                                        <Rating size="small" value={product.rating} readOnly precision={0.5} />
                                        <p>{product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'}</p>
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
                                <h2>Customer Reviews</h2>
                                {product.numReviews === 0 && <AlertMessage sev={'info'}>No reviews yet</AlertMessage>}
                                <List>
                                    {product.reviews.map((review) => (

                                        <ListItem key={review._id} divider>

                                            <ListItemText
                                                primary={
                                                    <p>
                                                        <strong>{review.name} </strong>
                                                        <Rating size='small' value={review.rating} readOnly />
                                                        {review.createdAt.substring(0, 10)}
                                                    </p>
                                                }
                                                secondary={
                                                    review.comment
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                    <ListItem>
                                        <h3>Review this product</h3>
                                        <ListItemSecondaryAction>
                                            <Button
                                                fullWidth
                                                className={classes.button}
                                                onClick={handleWriteToggle}
                                            >Write a review
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    {review && (
                                        <Grid container spacing={2} >
                                            <Grid item xs={12} >
                                                <FormGroup>
                                                    <FormControlLabel
                                                        label='overall rating'
                                                        labelPlacement='start'
                                                        control={
                                                            <Rating
                                                                size='small'
                                                                value={rating}
                                                                onChange={(e) => setRating(e.target.value)}

                                                            />}
                                                    />
                                                    <TextareaAutosize
                                                        rowsMin={4}
                                                        rowsMax={4}
                                                        placeholder='Add a review comment'
                                                        onChange={(e) => setComment(e.target.value)}
                                                    />

                                                </FormGroup>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {loadingReview && <Progress />}
                                                {errorReview && <AlertMessage sev='error'>{errorReview}</AlertMessage>}
                                                <Button
                                                    type='submit'
                                                    className={classes.button}
                                                    onClick={submitReviewHandler}
                                                >
                                                    Submit
                                                </Button>

                                            </Grid>


                                        </Grid>

                                    )}

                                </List>
                            </Grid>

                        </Grid>
                    </>
            }


        </>
    )
}

export default ProductScreen
