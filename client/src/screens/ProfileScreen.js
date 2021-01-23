import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, Button, Container, CssBaseline, Divider, Grid, TextField, Typography } from '@material-ui/core'

import { useStyles } from '../styles'
import { getUserProfile, updateUserProfile } from '../actions/userActions';
import AlertMessage from '../components/AlertMessage';
import Progress from '../components/Progress';

export default function ProfileScreen(props) {
    const { history, location } = props

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [msg, setMsg] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()
    const userProfile = useSelector(state => state.userProfile)
    const { user, loading, error } = userProfile

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo)
            history.push('/signin')
        else {
            if (!user.name) {
                console.log(user.name)
                dispatch(getUserProfile('profile'))
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confPassword)
            setMsg('Passwords do not match!')
        else {

            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }

    }

    return (
        <Grid container direction='row'>
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
                    <Typography component="h2" variant="h5">  Orders        </Typography>
                </div>
            </Grid>

        </Grid>

    );
}