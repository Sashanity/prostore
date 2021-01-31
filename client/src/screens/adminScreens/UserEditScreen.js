import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core'

import { useStyles } from '../../styles'
import { getUserProfile, editUserAdmin } from '../../actions/userActions'
import AlertMessage from '../../components/AlertMessage'
import Progress from '../../components/Progress'
import { USER_EDIT_RESET } from '../../consts/userConsts'
export default function UserEditScreen(props) {
    const { history, location, match } = props
    const userID = match.params.id
    const classes = useStyles();


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState('')
    const [reset, setReset] = useState('')
    const [password, setPassword] = useState('')

    const userProfile = useSelector(state => state.userProfile)
    const { user, loading, error } = userProfile
    const userEdit = useSelector(state => state.userEdit)
    const { success, loading: loadingEdit, error: errorEdit } = userEdit

    const dispatch = useDispatch()

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_EDIT_RESET })
            history.push('/signin?redirect=/admin/users')
        }
        else {
            if (!user || user._id !== userID || success) {
                dispatch(getUserProfile(userID))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [history, user, userID, success, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(editUserAdmin({ _id: userID, name, email, isAdmin, password }))
    }
    const generatePassword = (e) => {
        // generte random string of length 8
        setPassword(Math.random().toString(16).substr(2, 8))
    }

    return (
        <>
            <Link to='/admin/users'><Button>Go Back</Button></Link>
            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <i className='fas fa-edit'></i>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit User
        </Typography>

                    {error && <AlertMessage sev={'error'}>{error}</AlertMessage>}
                    {loading && <Progress />}
                    {loadingEdit && <Progress />}
                    {errorEdit && <AlertMessage sev={'error'}>{errorEdit}</AlertMessage>}

                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="name"
                                    name="Name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="Name"
                                    label=" Name"
                                    value={name}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={(e) => setReset(true)}>
                                    Reset Password
                                </Button>
                            </Grid>
                            {reset && (
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"

                                            fullWidth
                                            name="password"
                                            label="Password"
                                            // type="password"
                                            id="password"
                                            value={password}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={generatePassword}>
                                            Generate Password</Button>
                                    </Grid>
                                </>
                            )}

                        </Grid>
                        <FormControlLabel
                            control={<Checkbox
                                checked={isAdmin} color="primary" onChange={(e) => setIsAdmin(e.target.checked)} />}
                            label="Admin"
                        />
                        <br></br>
                        <Button
                            type="submit"
                            fullWidth
                            className={classes.button}
                            onClick={submitHandler}
                        >
                            Submit Changes
                    </Button>

                    </form>
                </div>

            </Container>
        </>
    );
}