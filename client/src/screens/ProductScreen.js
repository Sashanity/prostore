import React, { useState, useEffect } from 'react'
import { Button, Card, CardMedia, CircularProgress, Divider, Grid, List, ListItem, makeStyles } from '@material-ui/core'

import { Link } from 'react-router-dom'
import Rating from '../components/Rating';
import axios from 'axios'
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
    const { match } = props
    const classes = useStyles();
    const [product, setProduct] = useState([])
    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [match])
    return (
        <>
            <Link to='/'><Button>Go Back</Button></Link>

            <Grid container direction='row' spacing={2} styles={{ flexGrow: 1 }} >
                <Grid item md={6}>
                    {product.image
                        ? <CardMedia className={classes.image} image={product.image} />
                        : <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40%' }}><CircularProgress size={100} thickness={2.5} /> </div>}
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
                            <ListItem>
                                <Button
                                    fullWidth
                                    disabled={product.countInStock === 0}
                                    className={product.countInStock > 0 ? classes.button : classes.btndis}
                                >
                                    Add to cart</Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default ProductScreen
