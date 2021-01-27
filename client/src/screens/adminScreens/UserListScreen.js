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
        if (userInfo && userInfo.isAdmin)
            dispatch(getUserList())
        else {
            history.push('/signin')

        }
    }, [dispatch, userInfo])

    const deleteHandler = (userID) => {
        if (window.confirm('Are you sure')) {
            //   dispatch(deleteUser(userID))
        }
    }
    return (
        loading
            ? <Progress marginTop={'20%'} />
            : error
                ? <AlertMessage sev={'error'}>{error}</AlertMessage>
                : <Container>
                    <h1>Users</h1>
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
                                        <TableCell align="right"><a href={`mailto:${user.email}`}>{user.email}</a></TableCell>
                                        <TableCell align="right">{user.isAdmin && <i className='fas fa-check'></i>}</TableCell>
                                        <TableCell align="right">
                                            <Link to={`/admin/user/${user._id}/edit`}>
                                                <Button >
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </Link>
                                            <Button
                                                color="secondary"
                                                onClick={() => deleteHandler(user._id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Container>






    )
}

export default UserListScreen
