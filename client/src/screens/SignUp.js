import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Avatar, Button, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core'

import { useStyles } from '../styles'
import { signupUser } from '../actions/userActions';
import AlertMessage from '../components/AlertMessage';
import Progress from '../components/Progress';

export default function SignUp(props) {
    const { history, location } = props

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [confPassword, setConfPassword] = useState('')
    const [msg, setMsg] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()
    const userSignup = useSelector(state => state.userLogin)
    const { userInfo, loading, error } = userSignup

    useEffect(() => {
        if (userInfo)
            history.push(redirect)
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confPassword)
            setMsg('Passwords do not match!')
        else {

            dispatch(signupUser(name, email, password))
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <i className="fas fa-lock"></i>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                {error && <AlertMessage sev={'error'}>{error}</AlertMessage>}
                {loading && <Progress />}

                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="Name"
                                label=" Name"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                placeholder='example@email.com'
                                onChange={(e) => setEmail(e.target.value)}
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
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to={redirect ? `/signin?redirect=${redirect}` : '/signin'}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}