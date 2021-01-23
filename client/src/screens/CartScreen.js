import { Box, Button, Card, CardMedia, Divider, FormControl, Grid, List, ListItem, makeStyles, MenuItem, Select } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToCart, removeFromCart } from '../actions/cartActions'
import AlertMessage from '../components/AlertMessage'

const useStyles = makeStyles(() => ({

    image: {
        height: 0,
        paddingTop: '80%'
    },
    btndis: {
        background: '#E0E0E0'
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
}
));

const CartScreen = (props) => {
    const { history, match, location } = props
    const classes = useStyles();
    const pID = match.params.id

    // const qty = location.search
    // console.log('qty=', qty)

    // qty=# get the # from the link 
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { itemsInCart } = cart

    // console.log(itemsInCart)

    useEffect(() => {
        if (pID) {
            dispatch(addToCart(pID, qty))
        }
    }, [dispatch, pID, qty])

    // const handleChangeQty = (event) => {
    //     dispatch(addToCart(i.product, Number(event.target.value)))
    // }
    const handleCheckout = () => {
        history.push('/signin?redirect=shipping')
    }
    const removeFromCartHandler = (itemID) => {
        dispatch(removeFromCart(itemID))
    }
    return (
        <Grid container direction='row' spacing={2}>
            <Grid item md={8}>
                <h1> Shopping Cart</h1>
                {
                    itemsInCart.length === 0
                        ? <AlertMessage sev='info'>Your cart is empty <Link to='/'><Button>Go Back</Button></Link></AlertMessage>
                        : <List>
                            {
                                itemsInCart.map((i) => (
                                    <Box key={i.product}>
                                        <ListItem key={i.product}>
                                            <Grid container direction='row' justify='space-between' alignItems='center'>
                                                <Grid item md={2}>
                                                    <CardMedia className={classes.image} image={i.image} />
                                                </Grid>
                                                <Grid item md={3}>
                                                    <Link to={`/product/${i.product}`}>{i.name}</Link>
                                                </Grid>
                                                <Grid item md={2}>${i.price}</Grid>
                                                <Grid item md={2}>
                                                    <FormControl >
                                                        <Select
                                                            labelId="select-qty"
                                                            id="select-qty"
                                                            value={i.qty}
                                                            // onChange={handleChangeQty}
                                                            onChange={(e) => dispatch(addToCart(i.product, Number(e.target.value)))}
                                                        >
                                                            {
                                                                [...Array(i.countInStock).keys()].map(c => (

                                                                    <MenuItem key={c + 1} value={c + 1}>{c + 1}</MenuItem>

                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={2}>
                                                    <Button onClick={() => removeFromCartHandler(i.product)}>
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <Divider />
                                    </Box>
                                ))
                            }


                        </List>
                }
            </Grid>
            <Grid item md={4}>
                <Card>
                    <List>
                        <ListItem>
                            <h2>Subtotal ({itemsInCart.reduce((acc, i) => acc + i.qty, 0)}) items</h2>
                        </ListItem>
                        <ListItem>${itemsInCart.reduce((acc, i) => acc + i.qty * i.price, 0).toFixed(2)}</ListItem>
                        <Divider />
                        <ListItem>
                            <Button
                                fullWidth
                                disabled={itemsInCart.length === 0}
                                className={itemsInCart.length > 0 ? classes.button : classes.btndis}
                                onClick={handleCheckout}
                            >
                                Checkout</Button>
                        </ListItem>
                    </List>
                </Card>
            </Grid>


        </Grid>
    )
}

export default CartScreen
