import React from "react";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {
    GetAdminsDocument,
    useDeleteAdminMutation,
} from "../../generated/graphql";


type AdminListProps = {
    data: Array<string>
}

const AdminList: React.FunctionComponent<AdminListProps> = ({data}: AdminListProps) => {

    const [deleteAdmin] = useDeleteAdminMutation({
        refetchQueries: [{query: GetAdminsDocument}]
    });

    const handleDelete = (id: string) => {
        deleteAdmin({variables: {
            userId: id
        }});
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="services">
                <TableHead>
                    <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: string) => (
                        <TableRow key={row}>
                            <TableCell>{row}</TableCell>
                            <TableCell align='right'>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    onClick={() => handleDelete(row)}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdminList;