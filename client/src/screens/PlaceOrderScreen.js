import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AlertMessage from '../components/AlertMessage'
import { Link } from 'react-router-dom'
import { Box, Button, Card, CardMedia, Container, CssBaseline, Divider, Grid, List, ListItem } from '@material-ui/core'

import CheckoutSteps from '../components/CheckoutSteps'
import { useStyles } from '../styles'

const PlaceOrderScreen = () => {
    const classes = useStyles()
    const cart = useSelector(state => state.cart)
    const { shippingAddress, paymentMethod, itemsInCart } = cart

    // Calculating Prices
    cart.itemsPrice = cart.itemsInCart.reduce((acc, item) => acc + item.price * item.qty, 0)
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10
    cart.taxPrice = Number((0.09 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const placeOrderHandler = () => {
        // e.preventDefault()
        console.log('place order')
    }
    return (
        <Container>
            <CssBaseline />
            <CheckoutSteps step1 step2 step3 step4 />
            <Grid container >
                <Grid item md={8}>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address: </strong>
                        {shippingAddress.address},
                        {shippingAddress.city},
                        {shippingAddress.zipCode},
                        {shippingAddress.country}
                    </p>
                    <Divider />
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method: </strong>
                        {paymentMethod}
                    </p>
                    <Divider />
                    <h2>Order Items: </h2>
                    {itemsInCart.length === 0
                        ? <AlertMessage>Your cart is empty</AlertMessage>
                        : <List>
                            {itemsInCart.map((item, i) => (
                                <Box>
                                    <ListItem key={i}>
                                        <Grid container direction='row' alignItems="center" spacing={2}>
                                            <Grid item md={1}>
                                                <CardMedia className={classes.image} image={item.image} />
                                            </Grid>
                                            <Grid item xs>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Grid>
                                            <Grid item md={4}>
                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <Divider />
                                </Box>
                            ))}
                        </List>
                    }
                </Grid>
                <Grid item md={4}>
                    <Card>
                        <List>
                            <ListItem> <h2>Order Summary</h2></ListItem>
                            <ListItem>
                                <Grid container direction='row'>
                                    <Grid item xs>Items</Grid>
                                    <Grid item xs>${cart.itemsPrice}</Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container direction='row'>
                                    <Grid item xs>Shipping</Grid>
                                    <Grid item xs>${cart.shippingPrice}</Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container direction='row'>
                                    <Grid item xs>Tax</Grid>
                                    <Grid item xs>${cart.taxPrice}</Grid>
                                </Grid>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Grid container direction='row'>
                                    <Grid item xs>Total</Grid>
                                    <Grid item xs>${cart.totalPrice}</Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button
                                    type="submit"
                                    fullWidth
                                    className={itemsInCart.length > 0 ? classes.button : classes.btndis}
                                    onClick={placeOrderHandler}
                                >Place Order</Button>
                            </ListItem>

                        </List>
                    </Card>

                </Grid>

            </Grid>

        </Container>


    )
}

export default PlaceOrderScreen
