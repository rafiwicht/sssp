import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Divider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useGetSyslogsLazyQuery, useDeleteSyslogMutation, GetSyslogsDocument, Syslog as SyslogType } from '../../generated/graphql';
import SyslogForm from './SyslogForm';



type SyslogProps = {
    serviceId: string
}

const Syslog: React.FunctionComponent<SyslogProps> = ({serviceId}: SyslogProps) => {
    const [hidden, setHidden] = useState<boolean>(true);
    const [edit, setEdit] = useState<string>('');

    const [getSyslogs, {data, loading, error}] = useGetSyslogsLazyQuery({
        variables: {
            serviceId: serviceId
        }
    });
    const [deleteSyslog] = useDeleteSyslogMutation({
        refetchQueries: [{query: GetSyslogsDocument, variables: {serviceId: serviceId}}]
    });

    const handleDelete = (id: string) => {
        deleteSyslog({
            variables: {
                syslogId: id
            }
        });
    };

    const reset = () => {
        setEdit('');
        setHidden(true);
    }

    useEffect(() => {
        getSyslogs();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <Typography variant='h5'>Syslog options</Typography>
            <Divider />
            <TableContainer component={Paper}>
                <Table aria-label="sysloges">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align='right'>State</TableCell>
                            <TableCell align='right'>Index</TableCell>
                            <TableCell align='right'>Sourcetype</TableCell>
                            <TableCell align='right'>Port</TableCell>
                            <TableCell align='right'>Protocol</TableCell>
                            <TableCell align='right'>Hosts</TableCell>
                            <TableCell align='right'>Environments</TableCell>
                            <TableCell align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.syslogs?.map((row: SyslogType) => {
                            if(row._id === edit) {
                                return (
                                    <SyslogForm key={row._id} serviceId={serviceId} resetInput={reset} syslogMod={row} />
                                );
                            }
                            else {
                                return (
                                    <TableRow key={row._id}>
                                        <TableCell>{row._id}</TableCell>
                                        <TableCell align='right'>{row.state}</TableCell>
                                        <TableCell align='right'>{row.index}</TableCell>
                                        <TableCell align='right'>{row.sourcetype}</TableCell>
                                        <TableCell align='right'>{row.port}</TableCell>
                                        <TableCell align='right'>{row.protocol}</TableCell>
                                        <TableCell align='right'>{row.hosts.join(', ')}</TableCell>
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
                            <SyslogForm serviceId={serviceId} resetInput={reset} />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {hidden &&
            
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => setHidden(false)}
                >Add syslog</Button>
            }
        </div>
    );
}

export default Syslog;