import React from "react";
import {RouteComponentProps, withRouter, useParams} from "react-router-dom";
import {
    Button,
    Divider,
    Paper,
    Table, TableBody, TableCell, TableContainer,
    TableRow,
    Typography
} from "@material-ui/core";
import {useGetServiceQuery} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() =>
    createStyles({
        marginFields: {
            marginTop: 5,
            marginBottom: 5
        },
        marginButton: {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5
        }
    }),
);

const ServiceDetails: React.FunctionComponent<RouteComponentProps> = ({history}: RouteComponentProps) => {
    const { id } = useParams();
    const classes = useStyles();

    const {data, error, loading} = useGetServiceQuery( {
        variables: {
            serviceId: id
        }
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    const handleClose = () => {
        history.push('/service')
    }

    return (
        <div>
            <Typography variant='h3'>Service Details</Typography>
            <Typography variant='h5'>Service options</Typography>
            <Divider />
            <TableContainer component={Paper}>
                <Table aria-label="service">
                    <TableBody>
                        <TableRow key='name'>
                            <TableCell>Name</TableCell>
                            <TableCell align='right'>{data.service.name}</TableCell>
                        </TableRow>
                        <TableRow key='owner'>
                            <TableCell>Owner</TableCell>
                            <TableCell align='right'>{data.service.owner}</TableCell>
                        </TableRow>
                        <TableRow key='state'>
                            <TableCell>State</TableCell>
                            <TableCell align='right'>{data.service.state}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider />
            <Button
                variant='contained'
                className={classes.marginButton}
                onClick={() => handleClose()}
            >Close</Button>
        </div>

    );
}
export default withRouter(ServiceDetails);