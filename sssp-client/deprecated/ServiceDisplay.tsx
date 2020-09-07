import React from 'react';
import {Divider, Grid, Typography} from "@material-ui/core";
import IndexList from "../src/components/index/IndexList";
import AppList from "../src/components/app/AppList";
import PermissionList from "../src/components/permission/PermissionList";
import {createStyles, makeStyles} from "@material-ui/styles";
import {Service} from "../src/generated/graphql";


const useStyles = makeStyles(() =>
    createStyles({
        marginDivider: {
            marginBottom: 5
        }
    }),
);

type ServiceDisplayProps = {
    service: Service
}


const ServiceDisplay: React.FunctionComponent<ServiceDisplayProps> = ({service}: ServiceDisplayProps) => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant='h5'>Service options</Typography>
            <Divider className={classes.marginDivider}/>
            <Grid container spacing={2}>
                <Grid item md={2}>
                    Name
                </Grid>
                <Grid item md={10}>
                    {service.name}
                </Grid>
                <Grid item md={2}>
                    Owner
                </Grid>
                <Grid item md={10}>
                    {service.owner}
                </Grid>
                <Grid item md={2}>
                    State
                </Grid>
                <Grid item md={10}>
                    {service.state}
                </Grid>
                <Grid item md={2}>
                    Description
                </Grid>
                <Grid item md={10}>
                    {service.description}
                </Grid>
                <Grid item md={2}>
                    Data classification
                </Grid>
                <Grid item md={10}>
                    {service.dataClassification}
                </Grid>
            </Grid>
            <Typography variant='h5'>Indexes</Typography>
            <Divider className={classes.marginDivider}/>
            <IndexList data={service.indexes} />
            <Typography variant='h5'>Apps and addons</Typography>
            <AppList
                data={service.apps} />
            <Typography variant='h5'>Access options</Typography>
            <Divider className={classes.marginDivider}/>
            <PermissionList read={service.read} write={service.write} />
            <Divider className={classes.marginDivider}/>
        </div>
    )
}

export default ServiceDisplay;