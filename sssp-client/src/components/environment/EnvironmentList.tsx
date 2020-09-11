import React from 'react';
import {
    Button, Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

import {createStyles, makeStyles} from "@material-ui/styles";
import {
    Environment,
    GetEnvironmentsDocument,
    useDeleteEnvironmentMutation, usePutEnvironmentMutation
} from "../../generated/graphql";


const useStyles = makeStyles(() =>
    createStyles({
        marginButton: {
            marginLeft: 5
        }
    }),
);

export type EnvironmentListProps = {
    data: Array<Environment>
}

/**
 * List to update and delete environments
 * @param EnvironmentListProps 
 */
const EnvironmentList: React.FunctionComponent<EnvironmentListProps> = ({data}: EnvironmentListProps) => {
    const classes = useStyles();

    const [deleteEnvironment] = useDeleteEnvironmentMutation({
        refetchQueries: [{query: GetEnvironmentsDocument}]
    })

    const [putEnvironment] = usePutEnvironmentMutation({
        refetchQueries: [{query: GetEnvironmentsDocument}]
    })

    const handleDelete = (environmentId: string) => {
        deleteEnvironment({ variables: {
            environmentId: environmentId
        }});
    }

    /**
     * Updates the environment automatically when changing the access rights
     * @param environmentId 
     */
    const handleChange = (environmentId: string) => (event: any) => {
        putEnvironment({ variables: {
            environmentId: environmentId,
            environmentInput: {
                userAccess: event.target.checked
            }
        }})

    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="services">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Visible to users</TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: Environment) => (
                        <TableRow key={row._id}>
                            <TableCell>{row._id}</TableCell>
                            <TableCell align='right'>
                                <Checkbox
                                    checked={row.userAccess}
                                    id='userAccess'
                                    onChange={handleChange(row._id)}
                                />
                            </TableCell>
                            <TableCell align='right'>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    className={classes.marginButton}
                                    onClick={() => handleDelete(row._id)}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default EnvironmentList;
