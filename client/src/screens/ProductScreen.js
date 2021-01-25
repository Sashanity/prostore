import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardMedia, Divider, FormControl, Grid, List, ListItem, makeStyles, MenuItem, Select } from '@material-ui/core'

import { Link } from 'react-router-dom'
import Rating from '../components/Rating';

import Progress from '../components/Progress';
import { getProduct } from '../actions/productActions'
import AlertMessage from '../components/AlertMessage'
const useStyles = makeStyles(() => ({

    image: {
        height: 0,
        paddingTop: '80%'
    },
    button: {
        background: '#212121',
        borderRadius: 3,
        border: 0,
        color: 'white',
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "#424242"
        }
    },
    btndis: {
        background: '#E0E0E0'
    },
    progress: {
        margin: 'auto',

    }
}
));


const ProductScreen = (props) => {
    const { match, history } = props
    const classes = useStyles();
    const [qty, setQty] = useState(1);


    // const [product, setProduct] = useState([])
    const dispatch = useDispatch()
    const productInfo = useSelector(state => state.productInfo)
    const { product, loading, error } = productInfo
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
        setQty(event.target.value);

    }

    return (
        <>
            <Link to='/'><Button>Go Back</Button></Link>
            {loading
                ? <Progress marginTop={'20%'} />
                : error
                    ? <AlertMessage sev={'error'}>{error}</AlertMessage>
                    : <Grid container direction='row' spacing={2} styles={{ flexGrow: 1 }}  >
                        <Grid item md={6}>
                            {product.image
                                ? <CardMedia className={classes.image} image={product.image} />
                                : <Progress marginTop={'40%'} />
                            }
                        </Grid>
                        <Grid item md={3}>
                            <List>
                                <ListItem><h3>{product.name}</h3></ListItem>
                                <Divider />
                                <ListItem>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    Price: ${product.price}
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    Description: {product.description}
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item md={3}>
                            <Card>
                                <List >
                                    <ListItem>
                                        <Grid container direction='row' justify='space-between' alignItems='center'>
                                            <Grid item xs>Price:</Grid>
                                            <Grid item xs><strong>${product.price}</strong></Grid>
                                        </Grid>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <Grid container direction='row' justify='space-between' alignItems='center'>
                                            <Grid item xs>Status:</Grid>
                                            <Grid item xs>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Grid>
                                        </Grid>
                                    </ListItem>
                                    <Divider />
                                    {product.countInStock > 0 && (
                                        <ListItem>
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

                                    <Divider />
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
            }


        </>
    )
}

export default ProductScreen
