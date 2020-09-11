import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

/**
 * Display error messages as flash messages on screen
 * @param props 
 */
const Alert: React.FunctionComponent<AlertProps> = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Alert;
