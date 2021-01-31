import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getOrdersList } from '../../actions/orderActions'
import { useStyles } from '../../styles'
import Progress from '../../components/Progress';
import AlertMessage from '../../components/AlertMessage'

const OrderListScreen = (props) => {
    const { history } = props

    const classes = useStyles();

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const orderAdminList = useSelector(state => state.orderAdminList)
    const { orders, loading, error } = orderAdminList
    // const userDelete = useSelector(state => state.userDelete)
    // const { success } = userDelete

    // success as dependency so that screen refreshes on successful delete
    useEffect(() => {
        if (userInfo && userInfo.isAdmin)
            dispatch(getOrdersList())
        else {
            history.push('/signin')
        }
    }, [dispatch, userInfo, history])

    // const deleteHandler = (userID) => {
    //     if (window.confirm('Are you sure')) {
    //         dispatch(deleteUserById(userID))
    //     }
    // }
    return (
        loading
            ? <Progress marginTop={'20%'} />
            : error
                ? <AlertMessage sev={'error'}>{error}</AlertMessage>
                : <Container>
                    <h1>Orders</h1>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">USER</TableCell>
                                    <TableCell align="center">DATE</TableCell>
                                    <TableCell align="center">TOTAL</TableCell>
                                    <TableCell align="center">PAID</TableCell>
                                    <TableCell align="center">DELIVERED</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order._id}>
                                        <TableCell component="th" scope="row">{order._id}</TableCell>
                                        <TableCell align="center">{order.user}</TableCell>
                                        <TableCell align="center">{order.createdAt.substring(0, 10)}</TableCell>
                                        <TableCell align="center">${order.totalPrice}</TableCell>
                                        <TableCell align="center">{order.isPaid ? order.paidAt.substring(0, 10) : <i className="fas fa-times" style={{ color: '#FF6E40' }}></i>}</TableCell>
                                        <TableCell align="center">{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className="fas fa-times" style={{ color: '#FF6E40' }}></i>}</TableCell>
                                        <TableCell align="center">
                                            <Link to={`/order/${order._id}/edit`}>
                                                <Button >
                                                    Details
                                                </Button>
                                            </Link>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Container>






    )
}

export default OrderListScreen
