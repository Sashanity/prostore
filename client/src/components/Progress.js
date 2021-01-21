import React from 'react'
import { CircularProgress } from '@material-ui/core'

const Progress = ({ marginTop }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: marginTop }}>
            <CircularProgress size={100} thickness={2.0} />
        </div>
    )
}

export default Progress
