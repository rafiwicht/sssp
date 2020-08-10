import React from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

import { useHistory } from 'react-router-dom';

type SourcetypeListProps = {
    serviceId: string,
    data: Array<{
        _id: string,
        name: string
    }>
}

const SourcetypeList: React.FunctionComponent<SourcetypeListProps> = ({serviceId, data}: SourcetypeListProps) => {
    let history = useHistory();

    const handleHelper = (id: string) => {
        history.push(`/sourcetype/helper/${serviceId}/${id}`);
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="sourcetypes">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align='right'>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={() => handleHelper(row._id)}
                                >Sourcetype Helper</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default SourcetypeList;
