import { TableCell, TextField, MenuItem } from '@material-ui/core';
import React, {useEffect} from 'react';
import { Index, useGetIndexesLazyQuery } from '../../generated/graphql';

type IndexInputProps = {
    serviceId: string,
    index: string,
    handleChange: (prop: any) => (event: any) => void
}

/**
 * Helper to create an index selector with backend data
 * @param AppsInputProps
 */

const IndexInput: React.FunctionComponent<IndexInputProps> = ({serviceId, index, handleChange}: IndexInputProps) => {
    
    const [getApps, {data}] = useGetIndexesLazyQuery({
        variables: {
            serviceId: serviceId
        }
    });

    useEffect(() => {
        getApps();
    },[]);

    return (
        <TableCell align='right'>
            <TextField
                id="index"
                select
                fullWidth
                value={index}
                onChange={handleChange('index')}
                children={data?.indexes.map((e: Index, k: number) => (
                    <MenuItem key={k} value={e._id}>{e._id}</MenuItem>
                ))}
            />
        </TableCell>
    );
}

export default IndexInput;