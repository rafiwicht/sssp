import React from 'react';
import {Divider, Grid, Typography} from "@material-ui/core";
import IndexList from "../index/IndexList";
import AppList from "../app/AppList";
import UserList from "../user/UserList";
import {createStyles, makeStyles} from "@material-ui/styles";
import {Service} from "../../generated/graphql";


const useStyles = makeStyles(() =>
    createStyles({
        marginDivider: {
            marginBottom: 5
        }
    }),
);

type ServiceDisplayProps = {
    serviceNew: Service,
    serviceCurrent: Service
}


const ServiceDisplayCombined: React.FunctionComponent<ServiceDisplayProps> = ({serviceNew, serviceCurrent}: ServiceDisplayProps) => {
    const classes = useStyles();
    return (
        <div>
             <Grid container spacing={2}>
                <Grid item md={6}>
                <Typography variant='h4'>Current service</Typography>
                </Grid>
                <Grid item md={6}>
                <Typography variant='h4'>New service</Typography>
                </Grid>
            </Grid>
            <Typography variant='h5'>Service options</Typography>
            <Divider className={classes.marginDivider}/>
            <Grid container spacing={2}>
                <Grid item md={2}>
                    Name
                </Grid>
                <Grid item md={4}>
                    {serviceCurrent.name}
                </Grid>
                <Grid item md={2}>
                    Name
                </Grid>
                <Grid item md={4}>
                    {serviceNew.name}
                </Grid>
                <Grid item md={2}>
                    Owner
                </Grid>
                <Grid item md={4}>
                    {serviceCurrent.owner}
                </Grid>
                <Grid item md={2}>
                    Owner
                </Grid>
                <Grid item md={4}>
                    {serviceNew.owner}
                </Grid>
                <Grid item md={2}>
                    State
                </Grid>
                <Grid item md={4}>
                    {serviceCurrent.state}
                </Grid>
                <Grid item md={2}>
                    State
                </Grid>
                <Grid item md={4}>
                    {serviceNew.state}
                </Grid>
                <Grid item md={2}>
                    Description
                </Grid>
                <Grid item md={4}>
                    {serviceCurrent.description}
                </Grid>
                <Grid item md={2}>
                    Description
                </Grid>
                <Grid item md={4}>
                    {serviceNew.description}
                </Grid>
                <Grid item md={2}>
                    Data classification
                </Grid>
                <Grid item md={4}>
                    {serviceCurrent.dataClassification}
                </Grid>
                <Grid item md={2}>
                    Data classification
                </Grid>
                <Grid item md={4}>
                    {serviceNew.dataClassification}
                </Grid>
            </Grid>
            <Typography variant='h5'>Indexes</Typography>
            <Divider className={classes.marginDivider}/>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <IndexList data={serviceCurrent.indexes} />
                </Grid>
                <Grid item md={6}>
                    <IndexList data={serviceNew.indexes} />
                </Grid>
            </Grid>
            <Typography variant='h5'>Apps and addons</Typography>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <AppList data={serviceCurrent.apps} />
                </Grid>
                <Grid item md={6}>
                    <AppList data={serviceNew.apps} />
                </Grid>
            </Grid>
            <Typography variant='h5'>Access options</Typography>
            <Divider className={classes.marginDivider}/>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <UserList read={serviceCurrent.read} write={serviceCurrent.write} />
                </Grid>
                <Grid item md={6}>
                    <UserList read={serviceNew.read} write={serviceNew.write} />
                </Grid>
            </Grid>
            <Divider className={classes.marginDivider}/>
        </div>
    )
}

export default ServiceDisplayCombined;