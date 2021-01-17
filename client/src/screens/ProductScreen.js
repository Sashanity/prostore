import { Button, Card, CardMedia, Divider, Grid, List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating';
import products from '../products'

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

    }
}
));


const ProductScreen = (props) => {
    const { match } = props
    const classes = useStyles();
    const product = products.find(p => p._id === match.params.id)
    return (
        <>
            <Link to='/'><Button>Go Back</Button></Link>

            <Grid container direction='row' spacing={2} styles={{ flexGrow: 1 }} >
                <Grid item direction='column' md={6}>
                    <CardMedia className={classes.image} image={product.image} />
                </Grid>
                <Grid item direction='column' md={3}>
                    <List>
                        <ListItem><h3>{product.name.toUpperCase()}</h3></ListItem>
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
                <Grid item direction='column' md={3}>
                    <Card>
                        <List >
                            <ListItem>
                                <Grid item>Price:</Grid>
                                <Grid item><strong>${product.price}</strong></Grid>
                            </ListItem>
                            <ListItem>
                                <Grid item>Status:</Grid>
                                <Grid item>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Grid>
                            </ListItem>
                            <ListItem>
                                <Button disabled={product.countInStock === 0} className={classes.button}>Add to cart</Button>
                            </ListItem>

                        </List>

                    </Card>
                </Grid>
            </Grid>


        </>
    )
}

export default ProductScreen
