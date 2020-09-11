import { TableCell, TextField } from '@material-ui/core';
import React, {useEffect, useState} from 'react';


type HostsInput = {
    hosts: Array<string>,
    handleHostsChange: (hosts: Array<string>) => void
}

/**
 * Helper to create an host input field with comma seperated inputs
 * @param AppsInputProps
 */

const HostsInput: React.FunctionComponent<HostsInput> = ({hosts, handleHostsChange}: HostsInput) => {
    // Holds input as string
    const [hostsString, setHostsString] = useState<string>('');

    useEffect(() => {
        setHostsString(hosts.join(', '));
    },[]);

    const handleChange = (event: any) => {
        setHostsString(event.target.value);
        // Update state, where the input object is stored
        handleHostsChange(hostsString.trim().split(',').map(e => e.trim()));
    }
   
    return (
        <TableCell>
            <TextField
                id='hosts'
                type='text'
                required
                fullWidth
                onChange={handleChange}
                value={hostsString}
            />
        </TableCell>
    );
}

export default HostsInput;