import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Divider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useGetHttpsLazyQuery, useDeleteHttpMutation, GetHttpsDocument, Http as httpType } from '../../generated/graphql';
import HttpForm from './HttpForm';



type HttpProps = {
    serviceId: string
}

const http: React.FunctionComponent<HttpProps> = ({serviceId}: HttpProps) => {
    const [hidden, setHidden] = useState<boolean>(true);
    const [edit, setEdit] = useState<string>('');

    const [getHttps, {data, loading, error}] = useGetHttpsLazyQuery({
        variables: {
            serviceId: serviceId
        }
    });
    const [deleteHttp] = useDeleteHttpMutation({
        refetchQueries: [{query: GetHttpsDocument}]
    });

    const handleDelete = (id: string) => {
        deleteHttp({
            variables: {
                httpId: id
            }
        });
    };

    const reset = () => {
        setEdit('');
        setHidden(true);
    }

    useEffect(() => {
        getHttps();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <Typography variant='h5'>Http options</Typography>
            <Divider />
            <TableContainer component={Paper}>
                <Table aria-label="httpes">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align='right'>State</TableCell>
                            <TableCell align='right'>Token</TableCell>
                            <TableCell align='right'>Environments</TableCell>
                            <TableCell align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.https?.map((row: httpType) => {
                            if(row._id === edit) {
                                return (
                                    <HttpForm key={row._id} serviceId={serviceId} resetInput={reset} httpMod={row} />
                                );
                            }
                            else {
                                return (
                                    <TableRow key={row._id}>
                                        <TableCell>{row._id}</TableCell>
                                        <TableCell align='right'>{row.state}</TableCell>
                                        <TableCell align='right'>{row.token}</TableCell>
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
                            <HttpForm serviceId={serviceId} resetInput={reset} />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {hidden &&
            
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => setHidden(false)}
                >Add http</Button>
            }
        </div>
    );
}

export default http;