import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Divider, Checkbox } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useGetAppsLazyQuery, useDeleteAppMutation, GetAppsDocument, App as AppType } from '../../generated/graphql';
import AppForm from './AppForm';

type AppProps = {
    serviceId: string
}
/**
 * App edit and view page
 * @param AppProps 
 */
const App: React.FunctionComponent<AppProps> = ({serviceId}: AppProps) => {
    const [hidden, setHidden] = useState<boolean>(true);
    const [edit, setEdit] = useState<string>('');

    const [getApps, {data, loading, error}] = useGetAppsLazyQuery({
        variables: {
            serviceId: serviceId
        }
    });
    const [deleteApp] = useDeleteAppMutation({
        refetchQueries: [{query: GetAppsDocument, variables: {serviceId: serviceId}}]
    });

    const handleDelete = (id: string) => {
        deleteApp({
            variables: {
                appId: id
            }
        });
    };

    const reset = () => {
        setEdit('');
        setHidden(true);
    }

    useEffect(() => {
        getApps();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <Typography variant='h5'>App options</Typography>
            <Divider />
            <TableContainer component={Paper}>
                <Table aria-label="Appes">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align='right'>State</TableCell>
                            <TableCell align='right'>URL</TableCell>
                            <TableCell align='right'>Version</TableCell>
                            <TableCell align='right'>Git</TableCell>
                            <TableCell align='right'>Environments</TableCell>
                            <TableCell align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.apps?.map((row: AppType) => {
                            if(row._id === edit) {
                                return (
                                    <AppForm key={row._id} serviceId={serviceId} resetInput={reset} appMod={row} />
                                );
                            }
                            else {
                                return (
                                    <TableRow key={row._id}>
                                        <TableCell>{row._id}</TableCell>
                                        <TableCell align='right'>{row.state}</TableCell>
                                        <TableCell align='right'>{row.url}</TableCell>
                                        <TableCell align='right'>{row.version}</TableCell>
                                        <TableCell align='right'>
                                            <Checkbox 
                                                disabled 
                                                checked={row.git}
                                            />    
                                        </TableCell>
                                        <TableCell align='right'>{row.environmentIds.join(', ')}</TableCell>
                                        <TableCell align='right'>
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={() => setEdit(row._id)}
                                            >Edit</Button>
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                onClick={() => handleDelete(row._id)}
                                            >Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        })}
                        {!hidden && 
                            <AppForm serviceId={serviceId} resetInput={reset} />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {hidden &&
            
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => setHidden(false)}
                >Add app</Button>
            }
        </div>
    );
}

export default App;