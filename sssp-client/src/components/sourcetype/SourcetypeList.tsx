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

import {Index, Sourcetype} from "../../generated/graphql";
import { useHistory } from 'react-router-dom';



type SourcetypeListProps = {
    data: Array<Sourcetype>
}

const SourcetypeList: React.FunctionComponent<SourcetypeListProps> = ({data}: SourcetypeListProps) => {
    let history = useHistory();

    const handleHelper = (id: string) => {
        history.push('/sourcetype/helper/' + id);
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
                    {data.map((row: Sourcetype) => (
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
