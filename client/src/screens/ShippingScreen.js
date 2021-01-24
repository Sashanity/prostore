import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core'
import { useStyles } from '../styles'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = (props) => {
    const { history } = props
    const classes = useStyles();

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city);
    const [zipCode, setZipCode] = useState(shippingAddress.zipCode)
    const [country, setCountry] = useState(shippingAddress.counrty)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, zipCode, country }))

        //move to the next page
        history.push('/payment')

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <CheckoutSteps step1 step2 />
                <br></br>
                <Typography component="h3" variant="h5">
                    Shipping
            </Typography>
                {/* {error && <AlertMessage sev={'error'}>{error}</AlertMessage>}
            {loading && <Progress />} */}
                <form className={classes.form} noValidate>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="Address"
                        label="Address"
                        name="Address"
                        autoComplete="Address"
                        autoFocus
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="City"
                        label="City"
                        type="City"
                        id="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="zipcode"
                        label="zipcode"
                        type="zipcode"
                        id="zipcode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="Country"
                        label="Country"
                        type="Country"
                        id="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        className={classes.button}
                        onClick={submitHandler}
                    >
                        Proceed
                </Button>
                </form>
            </div>

        </Container >
    )
}

export default ShippingScreen
