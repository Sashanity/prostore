import React, { useState } from 'react'

import { Box, Button, FormControl, InputBase, InputLabel, makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

    multilineColor: {
        // color: 'white',
        backgroundColor: '#fff',

        borderRadius: 4,

        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff',
        },
        border: '1px solid #ced4da',
        padding: '5px 5px',
    },
}));
const SearchBar = (props) => {
    const classes = useStyles()
    const { history } = props
    const [keyword, setKeyword] = useState('')


    const submitHandler = (e) => {
        console.log('submit called')
        e.preventDefault()
        if (keyword.trim())
            history.push(`/search/${keyword}`)
        else
            history.push('/')
    }
    return (
        <form onSubmit={submitHandler} >

            <InputBase
                className={classes.multilineColor}
                placeholder='Search...'
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button
                type='submit'
                size="small"
                style={{ color: '#00E676' }}
            >
                Search</Button>
        </form>
    )
}

export default SearchBar
