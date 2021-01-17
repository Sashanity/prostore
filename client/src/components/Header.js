
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Container, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

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

    return (
        <div className={classes.root} >
            <AppBar position="static" style={{ 'background-color': '#282828' }} className='header' >
                <Container>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>PROSTORE</Typography>
                        <Link to='/cart' style={{ marginRight: 10 }}><i className='fas fa-shopping-cart'></i>CART</Link>
                        <Link to='/login'><i className='fas fa-user'></i>SIGN IN</Link>
                    </Toolbar>
                </Container>
            </AppBar>
        </div >
    );
} 