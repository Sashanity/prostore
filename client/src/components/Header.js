import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { AppBar, Toolbar, Container, Typography, makeStyles, Box, Button, Menu, MenuItem, Fade } from '@material-ui/core'
import { logoutUser } from '../actions/userActions';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(4),
    },
    title: {
        flexGrow: 1,
    },

}));

export default function Header() {
    const classes = useStyles();

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorElA, setAnchorElA] = useState(null);

    const handleClickUser = (event) => {
        setAnchorEl(event.currentTarget);
        console.log('NAVLINK CLICKED')
    }

    const handleClickAdmin = (event) => {
        setAnchorElA(event.currentTarget);
        console.log('NAVLINK ADMIN CLICKED')
    };

    const handleClose = () => {
        setAnchorEl(null)
    };
    const handleCloseA = () => {
        setAnchorElA(null)
    };
    const handleLogout = () => {
        dispatch(logoutUser())
        setAnchorEl(null)
    }

    return (
        <div className={classes.root} >
            <AppBar position="static" style={{ backgroundColor: '#282828' }} className='header' >
                <Container>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}><NavLink activeStyle={{ color: 'white' }} to='/'>PROSTORE</NavLink></Typography>
                        <Link to='/cart' style={{ marginRight: 10 }}><i className='fas fa-shopping-cart'></i>CART</Link>
                        {userInfo
                            ? (
                                <Box>
                                    <Button
                                        style={{ color: '#969696' }}
                                        onClick={handleClickUser}>
                                        {userInfo.name}<i className="fas fa-caret-down"></i>
                                    </Button>
                                    <Menu
                                        id="menu-user"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        <MenuItem onClick={handleClose}><Link to='/profile'>PROFILE</Link></MenuItem>
                                        <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
                                    </Menu>
                                </Box>
                            )
                            : <Link to='/signin'><i className='fas fa-user'></i> SIGN IN </Link>
                        }
                        {userInfo && userInfo.isAdmin && (
                            <Box>
                                <Button
                                    style={{ color: '#969696' }}
                                    onClick={handleClickAdmin}>
                                    ADMIN <i className="fas fa-caret-down"></i>
                                </Button>
                                <Menu
                                    id="menu-admin"
                                    anchorEl={anchorElA}
                                    keepMounted
                                    open={Boolean(anchorElA)}
                                    onClose={handleCloseA}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleCloseA}><Link to='/admin/users'>USERS</Link></MenuItem>
                                    <MenuItem onClick={handleCloseA}><Link to='/admin/orders'>ORDERS</Link></MenuItem>
                                    <MenuItem onClick={handleCloseA}><Link to='/admin/products'>PRODUCTS</Link></MenuItem>


                                </Menu>
                            </Box>
                        )

                        }


                    </Toolbar>
                </Container >
            </AppBar >
        </div >
    );
}

