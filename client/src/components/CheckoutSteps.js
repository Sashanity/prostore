import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid } from '@material-ui/core'

const CheckoutSteps = (props) => {
    const { step1, step2, step3, step4 } = props
    return (
        <Grid container style={{ display: 'flex', justifyContent: 'center', }}>
            <Grid item xs>
                {step1
                    ? <Box >
                        <Link to='/signin'>SignIn</Link> <i className='far fa-thumbs-up'></i>
                    </Box>
                    : <Link to='/signin' className='disabled'>SignIn</Link>}
            </Grid>
            <Grid item xs>
                {step2
                    ? <Box>
                        <Link to='/shipping'>Shipping</Link> <i className='far fa-thumbs-up'></i>
                    </Box>
                    : <Link to='/shipping' className='disabled'>Shipping</Link>}
            </Grid>
            <Grid item xs>
                {step3
                    ? <Box>
                        <Link to='/payment' >Payment</Link> <i className='far fa-thumbs-up'></i>
                    </Box>
                    : <Link to='/payment' className='disabled'>Payment</Link>}
            </Grid>
            <Grid item xs>
                {step4
                    ? <Box>
                        <Link to='/placeorder' >Place Order</Link> <i className='far fa-thumbs-up'></i>
                    </Box>
                    : <Link to='/placeorder' className='disabled'>Place Order</Link>}
            </Grid>

        </Grid>
    )
}

export default CheckoutSteps
