import React, {FunctionComponent} from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


const Alert: FunctionComponent<AlertProps> = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Alert;
