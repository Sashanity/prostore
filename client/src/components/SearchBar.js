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
    buttonSearch: {
        // background: '#212121',
        borderRadius: 3,
        border: 1,
        color: '#00E676',
        "&:hover": {
            color: 'white',
            background: '#00E676',
        }
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
                className={classes.buttonSearch}
            >
                Search</Button>
        </form>
    )
}

export default SearchBar
