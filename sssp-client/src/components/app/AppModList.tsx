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

import {AppInput} from "../../generated/graphql";


type AppModListProps = {
    data: Array<AppInput>,
    handleDelete: (key: number) => void
}

const AppModList: React.FunctionComponent<AppModListProps> = ({handleDelete, data = []}: AppModListProps) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="indexes">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Type</TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: AppInput, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align='right'>{row.type}</TableCell>
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
export default AppModList;
