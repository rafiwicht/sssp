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

import {Service} from "../../generated/graphql";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {createStyles, makeStyles} from "@material-ui/styles";


const useStyles = makeStyles(() =>
    createStyles({
        marginButton: {
            marginLeft: 5
        }
    }),
);

type ServiceListProps = RouteComponentProps & {
    data: Array<Service>
}

const ServiceList: React.FunctionComponent<ServiceListProps> = ({data, history}: ServiceListProps) => {
    const classes = useStyles();

    const handleDetails = (id: string) => {
        history.push('/service/details/' + id);
    }

    const handleUpdate = (id: string) => {
        history.push('/service/update/' + id);
    }

    const handleDelete = (id: string) => {
        history.push('/service/delete/' + id);
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="services">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Owner</TableCell>
                        <TableCell align='right'>State</TableCell>
                        <TableCell align='right'>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: Service) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align='right'>{row.owner}</TableCell>
                            <TableCell align='right'>{row.state}</TableCell>
                            <TableCell align='right'>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={() => handleDetails(row._id)}
                                >Details</Button>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    className={classes.marginButton}
                                    onClick={() => handleUpdate(row._id)}
                                >Edit</Button>
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
export default withRouter(ServiceList);
