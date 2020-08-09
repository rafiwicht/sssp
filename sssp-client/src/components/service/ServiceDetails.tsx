import React from "react";
import {useParams, useHistory} from "react-router-dom";
import {
    Button,
    Divider, Grid,
    Typography
} from "@material-ui/core";
import {useGetServiceQuery} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";
import IndexList from "../index/IndexList";
import UserList from "../user/UserList";
import SourcetypeList from "../sourcetype/SourcetypeList";

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
        },
        marginDivider: {
            marginBottom: 5
        }
    }),
);

const ServiceDetails: React.FC = () => {
    const { id } = useParams();
    const classes = useStyles();

    let history = useHistory();

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
            <Divider className={classes.marginDivider}/>
            <Grid container spacing={2}>
                <Grid item md={2}>
                    Name
                </Grid>
                <Grid item md={10}>
                    {data.service.name}
                </Grid>
                <Grid item md={2}>
                    Owner
                </Grid>
                <Grid item md={10}>
                    {data.service.owner}
                </Grid>
                <Grid item md={2}>
                    State
                </Grid>
                <Grid item md={10}>
                    {data.service.state}
                </Grid>
            </Grid>
            <Typography variant='h5'>Indexes</Typography>
            <Divider className={classes.marginDivider}/>
            <IndexList data={data.service.indexes} />
            <Typography variant='h5'>Sourcetypes</Typography>
            <SourcetypeList data={data.service.sourcetypes} />
            <Typography variant='h5'>Access options</Typography>
            <Divider className={classes.marginDivider}/>
            <UserList read={data.service.read} write={data.service.write} />
            <Divider className={classes.marginDivider}/>
            <Button
                variant='contained'
                className={classes.marginButton}
                onClick={() => handleClose()}
            >Close</Button>
        </div>

    );
}
export default ServiceDetails;