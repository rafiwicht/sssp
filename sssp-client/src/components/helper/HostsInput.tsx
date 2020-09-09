import { TableCell, TextField } from '@material-ui/core';
import React, {useEffect, useState} from 'react';


type HostsInput = {
    hosts: Array<string>,
    handleHostsChange: (hosts: Array<string>) => void
}

const HostsInput: React.FunctionComponent<HostsInput> = ({hosts, handleHostsChange}: HostsInput) => {
    const [hostsString, setHostsString] = useState<string>('');

    useEffect(() => {
        setHostsString(hosts.join(', '));
    },[]);

    const handleChange = (event: any) => {
        setHostsString(event.target.value);
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