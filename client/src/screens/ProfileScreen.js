import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'

import { useStyles } from '../styles'
import { getUserProfile, updateUserProfile } from '../actions/userActions'
import { getMyOrders } from '../actions/orderActions'
import { Link } from 'react-router-dom'
import AlertMessage from '../components/AlertMessage'
import Progress from '../components/Progress'
import { USER_PROFILE_UPDATE_RESET } from '../consts/userConsts'

export default function ProfileScreen(props) {
    const { history } = props

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [msg, setMsg] = useState('')



    const dispatch = useDispatch()
    const userProfile = useSelector(state => state.userProfile)
    const { user, loading, error } = userProfile

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderList = useSelector(state => state.orderList)
    const { orders, loading: loadingListOrders, error: errorListOrders } = orderList

    useEffect(() => {
        if (!userInfo)
            history.push('/signin')
        else {
            if (!user.name || success) {
                dispatch({ type: USER_PROFILE_UPDATE_RESET })
                dispatch(getUserProfile('profile'))
                dispatch(getMyOrders())
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confPassword)
            setMsg('Passwords do not match!')
        else {

            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <Grid container direction='row' spacing={2}>
            <Grid item md={3}>
                <div className={classes.paper}>
                    <Typography component="h2" variant="h5">User Profile</Typography>
                    {msg && <AlertMessage sev={'error'}>{msg}</AlertMessage>}
                    {error && <AlertMessage sev={'error'}>{error}</AlertMessage>}
                    {success && <AlertMessage sev={'success'}>Update Successfull</AlertMessage>}
                    {loading && <Progress />}

                    <form className={classes.form} noValidate>
                        <Grid container direction='row' spacing={2} styles={{ flexGrow: 1 }} >
                            <Grid item xs={12} >
                                <TextField
                                    fullWidth
                                    autoComplete="name"
                                    name="Name"
                                    variant="outlined"
                                    id="Name"
                                    label="Name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    placeholder='example@email.com'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Confirm Password"
                                    type="password"
                                    id="Conf password"
                                    autoComplete="current-password"
                                    onChange={(e) => setConfPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Button
                            type="submit"
                            fullWidth
                            className={classes.button}
                            onClick={submitHandler}
                        >
                            Edit Profile
                    </Button>
                    </form>
                </div>

            </Grid>

            <Grid item md={9}>
                <div className={classes.paper}>
                    <Typography component="h2" variant="h5">Your Orders</Typography>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">DATE</TableCell>
                                    <TableCell align="right">TOTAL</TableCell>
                                    <TableCell align="right">DELIVERED</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell component="th" scope="row">
                                            {order.id}
                                        </TableCell>
                                        <TableCell align="right">{order.createdAt.substring(0, 10)}</TableCell>
                                        <TableCell align="right">{order.totalPrice}</TableCell>
                                        <TableCell align="right">{order.isPaid ? order.paidAt.substring(0, 10) : (<i className='fas fa-times' styles={{ color: 'red' }} > </i>)}</TableCell>
                                        <TableCell align="right">{order.isDelivered ? order.deliveredAt.substring(0, 10) : (<i className='fas fa-times' styles={{ color: 'red' }} > </i>)}</TableCell>
                                        <TableCell align="right"><Link to={`/order/${order._id}`}>Details</Link></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Grid>

        </Grid>

    );
}