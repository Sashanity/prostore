import React from 'react'

import { Alert, AlertTitle } from '@material-ui/lab';

// children is a keyword

const AlertMessage = ({ sev, children }) => {
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
            {children}
        </Alert>
    )
}

AlertMessage.defaultProp = {
    severity: 'info'
}
export default AlertMessage
