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

import {IndexInput} from "../../generated/graphql";


type IndexListProps = {
    data: Array<IndexInput>,
    handleDelete: (key: number) => void
}

const IndexModList: React.FunctionComponent<IndexListProps> = ({handleDelete, data = []}: IndexListProps) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="indexes">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>MaxTotalDataSizeMB</TableCell>
                        <TableCell align='right'>FrozenTimePeriodInSecs</TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: IndexInput, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align='right'>{row.maxTotalDataSizeMB}</TableCell>
                            <TableCell align='right'>{row.frozenTimePeriodInSecs}</TableCell>
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
export default IndexModList;
