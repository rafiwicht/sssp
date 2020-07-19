import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

import {Index} from "../../generated/graphql";


type IndexListProps = {
    read: Array<string>,
    write: Array<string>
}

const IndexList: React.FunctionComponent<IndexListProps> = ({read, write}: IndexListProps) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="indexes">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Read</TableCell>
                        <TableCell align='right'>Write</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {write.map((name: string) => (
                        <TableRow key={name}>
                            <TableCell>{name}</TableCell>
                            <TableCell align='right'>X</TableCell>
                            <TableCell align='right'>X</TableCell>
                        </TableRow>
                    ))}
                    {read.map((name: string) => (
                        <TableRow key={name}>
                            <TableCell>{name}</TableCell>
                            <TableCell align='right'>X</TableCell>
                            <TableCell align='right'> </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default IndexList;
