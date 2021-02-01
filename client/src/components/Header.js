import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Route } from 'react-router-dom'

import { AppBar, Toolbar, Container, Typography, makeStyles, Box, Button, Menu, MenuItem, Fade, Popper, Grow, ClickAwayListener, Paper, MenuList } from '@material-ui/core'
import { logoutUser } from '../actions/userActions';
import SearchBar from './SearchBar';

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
    const classes = useStyles()


    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [openAdmin, setOpenAdmin] = useState(false)
    const anchorRefAdmin = useRef(null)
    const [openUser, setOpenUser] = useState(false)
    const anchorRefUser = useRef(null)

    const handleLogout = () => {
        dispatch(logoutUser())
        setOpenUser(null)
    }

    const handleToggleUser = () => {
        setOpenUser((prevOpenUser) => !prevOpenUser)
    }

    const handleToggleAdmin = () => {
        setOpenAdmin((prevOpenAdmin) => !prevOpenAdmin)
    }

    const handleCloseAdmin = (e) => {
        if (anchorRefAdmin.current && anchorRefAdmin.current.contains(e.target)) {
            return
        }
        setOpenAdmin(false);
    }
    const handleCloseUser = (e) => {
        if (anchorRefUser.current && anchorRefUser.current.contains(e.target)) {
            return
        }
        setOpenUser(false);
    }

    function handleListKeyDown(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            setOpenAdmin(false);
        }
    }
    function handleListKeyDownUser(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            setOpenUser(false);
        }
    }


    // return focus to the button when we transitioned from !open -> open
    const prevOpenAdmin = useRef(openAdmin);
    const prevOpenUser = useRef(openUser);
    useEffect(() => {
        if (prevOpenAdmin.current === true && openAdmin === false) {
            anchorRefAdmin.current.focus()
        }

        prevOpenAdmin.current = openAdmin

        if (prevOpenUser.current === true && openUser === false) {
            anchorRefUser.current.focus()
        }

        prevOpenUser.current = openUser
    }, [openAdmin, openUser])

    return (
        <div className={classes.root} >
            <AppBar position="static" style={{ backgroundColor: '#282828' }} className='header' >
                <Container>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}><NavLink activeStyle={{ color: 'white' }} to='/'>PROSTORE</NavLink></Typography>

                        <Route render={({ history }) => <SearchBar history={history} />} />
                        <Link to='/cart' style={{ marginRight: 10 }}><i className='fas fa-shopping-cart'></i>CART</Link>
                        {userInfo
                            ? (
                                <Box>
                                    <Button
                                        style={{ color: '#969696' }}
                                        ref={anchorRefUser}
                                        aria-controls={openUser ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggleUser}>
                                        {userInfo.name}<i className="fas fa-caret-down"></i>
                                    </Button>
                                    <Popper
                                        open={openUser}
                                        anchorEl={anchorRefUser.current}
                                        role={undefined}
                                        transition
                                        disablePortal={false}
                                        modifiers={{
                                            flip: {
                                                enabled: true,
                                            },
                                            preventOverflow: {
                                                enabled: true,
                                                boundariesElement: 'scrollParent',
                                            }
                                        }}>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleCloseUser}>
                                                        <MenuList autoFocusItem={openUser} id="menu-list-grow" onKeyDown={handleListKeyDownUser}>
                                                            <MenuItem onClick={handleCloseUser}><Link to='/profile'>PROFILE</Link></MenuItem>
                                                            <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                    {/* <Menu
                                        id="menu-user"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        <MenuItem onClick={handleClose}><Link to='/profile'>PROFILE</Link></MenuItem>
                                        <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
                                    </Menu> */}

                                </Box>
                            )
                            : <Link to='/signin'><i className='fas fa-user'></i> SIGN IN </Link>
                        }
                        {userInfo && userInfo.isAdmin && (
                            <>
                                <Button
                                    style={{ color: '#969696' }}
                                    ref={anchorRefAdmin}
                                    aria-controls={openAdmin ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    // onClick={handleClickAdmin}
                                    onClick={handleToggleAdmin}
                                >
                                    ADMIN <i className="fas fa-caret-down"></i>
                                </Button>
                                <Popper
                                    open={openAdmin}
                                    anchorEl={anchorRefAdmin.current}
                                    role={undefined}
                                    transition
                                    disablePortal={false}
                                    modifiers={{
                                        flip: {
                                            enabled: true,
                                        },
                                        preventOverflow: {
                                            enabled: true,
                                            boundariesElement: 'scrollParent',
                                        }
                                    }}>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleCloseAdmin}>
                                                    <MenuList autoFocusItem={openAdmin} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                        <MenuItem onClick={handleCloseAdmin}><Link to='/admin/users'>USERS</Link></MenuItem>
                                                        <MenuItem onClick={handleCloseAdmin}><Link to='/admin/orders'>ORDERS</Link></MenuItem>
                                                        <MenuItem onClick={handleCloseAdmin}><Link to='/admin/products'>PRODUCTS</Link></MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </>
                        )

                        }


                    </Toolbar>
                </Container >
            </AppBar >
        </div >
    );
}

