import React from 'react'

import { Alert, AlertTitle } from '@material-ui/lab';

const AlertMessage = ({ sev, errMsg }) => {
    return (

        <Alert severity={sev}>
            <AlertTitle>
                {sev === 'error'
                    ? 'Error'
                    : sev === 'warning'
                        ? 'Warning'
                        : sev === 'info'
                            ? 'Info'
                            : sev === 'success'
                                ? 'Success'
                                : ''}
            </AlertTitle>
            {errMsg}
        </Alert>
    )
}

AlertMessage.defaultProp = {
    severity: 'info'
}
export default AlertMessage
