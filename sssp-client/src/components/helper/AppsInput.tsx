import { TableCell, TextField, MenuItem } from '@material-ui/core';
import React, {useEffect} from 'react';
import { App, useGetAppsLazyQuery } from '../../generated/graphql';

type AppsInputProps = {
    serviceId: string,
    appIds: Array<string>,
    handleChange: (prop: any) => (event: any) => void
}

/**
 * Helper to create an app selector with backend data
 * @param AppsInputProps
 */

const AppsInput: React.FunctionComponent<AppsInputProps> = ({serviceId, appIds, handleChange}: AppsInputProps) => {
    
    const [getApps, {data}] = useGetAppsLazyQuery({
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
                id="appIds"
                select
                fullWidth
                value={appIds}
                onChange={handleChange('appIds')}
                SelectProps={{multiple: true}}
                children={data?.apps.map((e: App, k: number) => (
                    <MenuItem key={k} value={e._id}>{e._id}</MenuItem>
                ))}
            />
        </TableCell>
    );
}

export default AppsInput;