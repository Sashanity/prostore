import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { useStyles } from '../../styles'

import { getUserList, deleteUserById } from '../../actions/userActions'
import Progress from '../../components/Progress'
import AlertMessage from '../../components/AlertMessage'

const UserListScreen = (props) => {
    const { history } = props

    const classes = useStyles()

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userList = useSelector(state => state.userList)
    const { users, loading, error } = userList
    const userDelete = useSelector(state => state.userDelete)
    const { success } = userDelete

    // success as dependency so that screen refreshes on successful delete
    useEffect(() => {
        if (userInfo && userInfo.isAdmin)
            dispatch(getUserList())
        else {
            history.push('/signin')
        }
    }, [dispatch, userInfo, success, history])

    const deleteHandler = (userID) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUserById(userID))
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
                                    <TableCell align="center">NAME</TableCell>
                                    <TableCell align="center">EMAIL</TableCell>
                                    <TableCell align="center">ADMIN</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell component="th" scope="row">{user._id}</TableCell>
                                        <TableCell align="center">{user.name}</TableCell>
                                        <TableCell align="center"><a href={`mailto:${user.email}`}>{user.email}</a></TableCell>
                                        <TableCell align="center">{user.isAdmin && <i className='fas fa-check'></i>}</TableCell>
                                        <TableCell align="center">
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
