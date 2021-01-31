import React from 'react'
import { CircularProgress } from '@material-ui/core'

const Progress = ({ marginTop, s }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: marginTop }}>
            <CircularProgress size={s} thickness={2.0} />
        </div>
    )
}
Progress.defaultProp = {
    size: 100
}

export default Progress
