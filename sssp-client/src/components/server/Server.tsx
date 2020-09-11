import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Divider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useGetServersLazyQuery, useDeleteServerMutation, GetServersDocument, Server as ServerType } from '../../generated/graphql';
import ServerForm from './ServerForm';

type ServerProps = {
    serviceId: string
}

/**
 * Server edit and view page
 * @param ServerProps 
 */
const Server: React.FunctionComponent<ServerProps> = ({serviceId}: ServerProps) => {
    const [hidden, setHidden] = useState<boolean>(true);
    const [edit, setEdit] = useState<string>('');

    const [getServers, {data, loading, error}] = useGetServersLazyQuery({
        variables: {
            serviceId: serviceId
        }
    });
    const [deleteServer] = useDeleteServerMutation({
        refetchQueries: [{query: GetServersDocument, variables: {serviceId: serviceId}}]
    });

    const handleDelete = (id: string) => {
        deleteServer({
            variables: {
                serverId: id
            }
        });
    };

    const reset = () => {
        setEdit('');
        setHidden(true);
    }

    useEffect(() => {
        getServers();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <Typography variant='h5'>Server options</Typography>
            <Divider />
            <TableContainer component={Paper}>
                <Table aria-label="serveres">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align='right'>State</TableCell>
                            <TableCell align='right'>Hosts</TableCell>
                            <TableCell align='right'>Apps</TableCell>
                            <TableCell align='right'>Environments</TableCell>
                            <TableCell align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.servers?.map((row: ServerType) => {
                            if(row._id === edit) {
                                return (
                                    <ServerForm key={row._id} serviceId={serviceId} resetInput={reset} serverMod={row} />
                                );
                            }
                            else {
                                return (
                                    <TableRow key={row._id}>
                                        <TableCell>{row._id}</TableCell>
                                        <TableCell align='right'>{row.state}</TableCell>
                                        <TableCell align='right'>{row.hosts.join(', ')}</TableCell>
                                        <TableCell align='right'>{row.appIds.join(', ')}</TableCell>
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
                            <ServerForm serviceId={serviceId} resetInput={reset} />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {hidden &&
            
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => setHidden(false)}
                >Add server</Button>
            }
        </div>
    );
}

export default Server;