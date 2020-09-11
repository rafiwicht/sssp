import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Divider } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useGetIndexesLazyQuery, useDeleteIndexMutation, GetIndexesDocument, Index as IndexType } from '../../generated/graphql';
import IndexForm from './IndexForm';

type IndexProps = {
    serviceId: string
}

/**
 * Index edit and view page
 * @param IndexProps 
 */
const Index: React.FunctionComponent<IndexProps> = ({serviceId}: IndexProps) => {
    const [hidden, setHidden] = useState<boolean>(true);
    const [edit, setEdit] = useState<string>('');

    const [getIndexes, {data, loading, error}] = useGetIndexesLazyQuery({
        variables: {
            serviceId: serviceId
        }
    });
    const [deleteIndex] = useDeleteIndexMutation({
        refetchQueries: [{query: GetIndexesDocument, variables: {serviceId: serviceId}}]
    });

    const handleDelete = (id: string) => {
        deleteIndex({
            variables: {
                indexId: id
            }
        });
    };

    const reset = () => {
        setEdit('');
        setHidden(true);
    }

    useEffect(() => {
        getIndexes();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <Typography variant='h5'>Index options</Typography>
            <Divider />
            <TableContainer component={Paper}>
                <Table aria-label="indexes">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align='right'>State</TableCell>
                            <TableCell align='right'>MaxTotalDataSizeMB</TableCell>
                            <TableCell align='right'>FrozenTimePeriodInSecs</TableCell>
                            <TableCell align='right'>Environments</TableCell>
                            <TableCell align='right'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.indexes.map((row: IndexType) => {
                            if(row._id === edit) {
                                return (
                                    <IndexForm key={row._id} serviceId={serviceId} resetInput={reset} indexMod={row} />
                                );
                            }
                            else {
                                return (
                                    <TableRow key={row._id}>
                                        <TableCell>{row._id}</TableCell>
                                        <TableCell align='right'>{row.state}</TableCell>
                                        <TableCell align='right'>{row.maxTotalDataSizeMB}</TableCell>
                                        <TableCell align='right'>{row.frozenTimePeriodInSecs}</TableCell>
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
                            <IndexForm serviceId={serviceId} resetInput={reset} />
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {hidden &&
            
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => setHidden(false)}
                >Add index</Button>
            }
        </div>
    );
}

export default Index;