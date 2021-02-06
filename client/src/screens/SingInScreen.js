import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Avatar, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core'
import { useStyles } from '../styles'

import { loginUser } from '../actions/userActions'
import AlertMessage from '../components/AlertMessage'
import Progress from '../components/Progress'

export default function SignIn(props) {
    const { history, location } = props

    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // redirect to see if user logged in or not
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, loading, error } = userLogin
    useEffect(() => {
        if (userInfo)
            history.push(redirect)
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(loginUser(email, password))
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    {/* <LockOutlinedIcon /> */}
                    <i className="fas fa-lock"></i>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {error && <AlertMessage sev={'error'}>{error}</AlertMessage>}
                {loading && <Progress />}
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        placeholder='example@email.com'
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        className={classes.button}
                        onClick={submitHandler}
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link to='/'>
                                Forgot password?
              </Link>
                        </Grid>
                        <Grid item>
                            <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}