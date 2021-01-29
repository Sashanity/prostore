import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { PayPalButton } from "react-paypal-button-v2"

import AlertMessage from '../components/AlertMessage'
import { Link } from 'react-router-dom'
import { Box, Button, Card, CardMedia, Container, CssBaseline, Divider, Grid, List, ListItem } from '@material-ui/core'

import Progress from '../components/Progress';
import { useStyles } from '../styles'
import { getOrderInfo, orderPay, orderDeliver } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../consts/orderConsts'

const OrderScreen = (props) => {
    const { match } = props
    const classes = useStyles()
    const [sdkReady, setSdkReady] = useState(false)
    const orderID = match.params.id

    // bring it from the state
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const orderInfo = useSelector((state) => state.orderInfo)
    const { order, loading, error } = orderInfo
    const orderPaid = useSelector((state) => state.orderPaid)
    const { loading: loadingPaid, success: successPaid } = orderPaid
    const orderDelivery = useSelector((state) => state.orderDelivery)
    const { loading: loadingDelivery, success: successDelivery } = orderDelivery

    if (!loading) {
        //   Calculate prices
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        const createPayPalScript = async () => {
            const { data: clientID } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPaid || order._id !== orderID || successDelivery) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderInfo(orderID))
        } else {
            if (!order.isPaid) {
                if (window.paypal) {
                    createPayPalScript()
                }
                else {
                    setSdkReady(true)
                }
            }
        }

    }, [dispatch, order, successPaid, orderID, successDelivery])


    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(orderPay(orderID, paymentResult))

    }
    const deliverHandler = () => {
        dispatch(orderDeliver(order))
    }
    return loading
        ? <Progress marginTop={'20%'} />
        : error
            ? <AlertMessage sev={'error'}>{error}</AlertMessage>
            : <Container>
                <h1>Order {order._id}</h1>
                <CssBaseline />
                <Grid container alignItems="center" spacing={2}>
                    <Grid item md={8}>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong> {order.user.name}
                        </p>
                        <p>
                            <strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address},
                   {order.shippingAddress.city},
                   {order.shippingAddress.zipCode},
                   {order.shippingAddress.country}
                        </p>
                        {order.isDelivered
                            ? <AlertMessage sev={'success'}>Delivered on {order.deliveredAt}</AlertMessage>
                            : <AlertMessage sev={'warning'}>Not Delivered</AlertMessage>
                        }
                        <Divider />
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid
                            ? <AlertMessage sev={'success'}>Paid on {order.paidAt}</AlertMessage>
                            : <AlertMessage sev={'warning'}>Not Paid</AlertMessage>
                        }
                        <Divider />
                        <h2>Order Items: </h2>
                        {order.orderItems.length === 0
                            ? <AlertMessage>Order is empty</AlertMessage>
                            : <List>
                                {order.orderItems.map((item, i) => (
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
                                        <Grid item xs>${order.itemsPrice}</Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container direction='row'>
                                        <Grid item xs>Shipping</Grid>
                                        <Grid item xs>${order.shippingPrice}</Grid>
                                    </Grid>
                                </ListItem>
                                <ListItem>
                                    <Grid container direction='row'>
                                        <Grid item xs>Tax</Grid>
                                        <Grid item xs>${order.taxPrice}</Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Grid container direction='row'>
                                        <Grid item xs>Total</Grid>
                                        <Grid item xs>${order.totalPrice}</Grid>
                                    </Grid>
                                </ListItem>
                                {!order.isPaid && (
                                    <ListItem>
                                        {loadingPaid && <Progress />}
                                        {!sdkReady ? (
                                            <Progress />
                                        ) : (
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )}
                                    </ListItem>
                                )}
                                {loadingDelivery && <Progress />}
                                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListItem>
                                        <Button
                                            className={classes.button}
                                            fullWidth
                                            onClick={deliverHandler}
                                        >Mark as Delivered</Button>
                                    </ListItem>
                                )}

                            </List>
                        </Card>
                        <Box mt={2}>
                            <Link to={'/'}>
                                <Button
                                    fullWidth
                                    className={classes.button}>Continue Shopping</Button></Link>
                        </Box>


                    </Grid>

                </Grid>

            </Container>
}

export default OrderScreen

