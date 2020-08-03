import React, {ChangeEvent} from 'react';
import {
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";


type UserModListProps = {
    read: Array<string>,
    write: Array<string>,
    handleAccessChange: (userId: string, accessType: ChangeEvent<HTMLInputElement>) => void
}

const UserModList: React.FunctionComponent<UserModListProps> = ({read, write, handleAccessChange}: UserModListProps) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="indexes">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Read</TableCell>
                        <TableCell align='right'>Write</TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {write.map((userId: string) => (
                        <TableRow key={userId}>
                            <TableCell>{userId}</TableCell>
                            <TableCell align='right'>
                                <Checkbox checked disabled />
                            </TableCell>
                            <TableCell align='right'>
                                <Checkbox checked onChange={(event) => handleAccessChange(userId, event)} />
                            </TableCell>
                            <TableCell align='right'>Delete</TableCell>
                        </TableRow>
                    ))}
                    {read.map((userId: string) => (
                        <TableRow key={userId}>
                            <TableCell>{userId}</TableCell>
                            <TableCell align='right'>
                                <Checkbox checked disabled />
                            </TableCell>
                            <TableCell align='right'>
                                <Checkbox onChange={(event) => handleAccessChange(userId, event)} />
                            </TableCell>
                            <TableCell align='right'>Delete</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default UserModList;
