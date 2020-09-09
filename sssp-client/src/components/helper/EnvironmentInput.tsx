import { TableCell, TextField, MenuItem } from '@material-ui/core';
import React, {useEffect} from 'react';
import { Environment, useGetEnvironmentsLazyQuery } from '../../generated/graphql';

type EnvironmentInputProps = {
    environmentIds: Array<string>,
    handleChange: (prop: any) => (event: any) => void
}

const EnvironmentInput: React.FunctionComponent<EnvironmentInputProps> = ({environmentIds, handleChange}: EnvironmentInputProps) => {
    
    const [getEnvironments, {data}] = useGetEnvironmentsLazyQuery();

    useEffect(() => {
        getEnvironments();
    },[]);

    return (
        <TableCell align='right'>
            <TextField
                id="environmentIds"
                select
                fullWidth
                value={environmentIds}
                onChange={handleChange('environmentIds')}
                SelectProps={{multiple: true}}
                children={data?.environments.map((e: Environment, k: number) => (
                    <MenuItem key={k} value={e._id}>{e._id}</MenuItem>
                ))}
            />
        </TableCell>
    );
}

export default EnvironmentInput;