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
    data: Array<Index>
}

const IndexList: React.FunctionComponent<IndexListProps> = ({data}: IndexListProps) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="indexes">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>MaxTotalDataSizeMB</TableCell>
                        <TableCell align='right'>FrozenTimePersionInSecs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: Index) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align='right'>{row.maxTotalDataSizeMB}</TableCell>
                            <TableCell align='right'>{row.frozenTimePeriodInSecs}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default IndexList;
