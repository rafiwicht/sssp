import React, {ChangeEvent} from 'react';
import {
    Button,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/styles";


type UserModListProps = {
    read: Array<string>,
    write: Array<string>,
    handleAccessChange: (userId: string, accessType: boolean) => void,
    handlePermissionDelete: (userId: string) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        marginButton: {
            marginLeft: 5
        }
    }),
);

const UserModList: React.FunctionComponent<UserModListProps> = ({read, write, handleAccessChange, handlePermissionDelete}: UserModListProps) => {
    const classes = useStyles();

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
                                <Checkbox checked onChange={(event) => handleAccessChange(userId, event.target.checked)} />
                            </TableCell>
                            <TableCell align='right'>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    className={classes.marginButton}
                                    onClick={() => handlePermissionDelete(userId)}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {read.map((userId: string) => (
                        <TableRow key={userId}>
                            <TableCell>{userId}</TableCell>
                            <TableCell align='right'>
                                <Checkbox checked disabled />
                            </TableCell>
                            <TableCell align='right'>
                                <Checkbox onChange={(event) => handleAccessChange(userId, event.target.checked)} />
                            </TableCell>
                            <TableCell align='right'>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    className={classes.marginButton}
                                    onClick={() => handlePermissionDelete(userId)}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default UserModList;
