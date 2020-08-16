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
import { SourcetypeInput } from '../../generated/graphql';


type SourcetypeModListProps = {
    data: Array<SourcetypeInput>,
    handleDelete: (key: number) => void
}

const SourcetypeModList: React.FunctionComponent<SourcetypeModListProps> = ({handleDelete, data = []}: SourcetypeModListProps) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="indexes">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: SourcetypeInput, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align='right'>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    onClick={() => handleDelete(index)}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default SourcetypeModList;
