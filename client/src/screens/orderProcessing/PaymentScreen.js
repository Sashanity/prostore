import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@material-ui/core'
import { useStyles } from '../../styles'
import { savePaymentMethod } from '../../actions/cartActions'
import CheckoutSteps from '../../components/CheckoutSteps'

const PaymentScreen = (props) => {
    const { history } = props
    const classes = useStyles();

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')


    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))

        //move to the next page
        history.push('/signin?redirect=placeOrder')
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <CheckoutSteps step1 step2 step3 />
            <div className={classes.paper}>


                <Typography component="h3" variant="h5">
                    Payment Method
            </Typography>
                <br></br>

                {/* {error && <AlertMessage sev={'error'}>{error}</AlertMessage>}
            {loading && <Progress />} */}
                <form className={classes.form} noValidate>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Select Payment Method</FormLabel>
                        <RadioGroup aria-label="Payment Method" name="payment"
                        // value={value} onChange={handleChange}
                        >
                            <FormControlLabel value="PayPal" control={<Radio color="default" />} label="PayPal or Credit Card " />
                            <FormControlLabel disabled value="Stripe" control={<Radio color="default" />} label="Stripe" />
                            <FormControlLabel disabled value="Amazon Pay" control={<Radio color="default" />} label="Amazon Pay" />

                        </RadioGroup>
                    </FormControl>
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

export default PaymentScreen
