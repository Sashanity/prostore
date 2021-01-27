import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getUserList } from '../../actions/userActions'
import { useStyles } from '../../styles'
import Progress from '../../components/Progress';
import AlertMessage from '../../components/AlertMessage';
const UserListScreen = (props) => {
    const { history } = props

    const classes = useStyles();

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userList = useSelector(state => state.userList)
    const { users, loading, error } = userList

    useEffect(() => {
        if (!userInfo)
            history.push('/signin')
        else {
            if (userInfo.isAdmin)
                dispatch(getUserList())
        }
    }, [dispatch, userInfo])

    return (
        loading
            ? <Progress marginTop={'20%'} />
            : error
                ? <AlertMessage sev={'error'}>{error}</AlertMessage>
                : <Container>
                    <Typography component="h2" variant="h5">Users</Typography>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">NAME</TableCell>
                                    <TableCell align="right">EMAIL</TableCell>
                                    <TableCell align="right">ADMIN</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell component="th" scope="row">{user._id}</TableCell>
                                        <TableCell align="right">{user.name}</TableCell>
                                        <TableCell align="right">{user.email}</TableCell>
                                        <TableCell align="right">{user.isAdmin && <i className='fas fa-check'></i>}</TableCell>
                                        <TableCell align="right"><Link to={`mailto:${user.email}`}>Email</Link></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Container>






    )
}

export default UserListScreen
