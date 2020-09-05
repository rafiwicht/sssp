import React from 'react';
import {Divider, Grid, Typography} from "@material-ui/core";
import IndexList from "../index/IndexList";
import AppList from "../app/AppList";
import PermissionList from "../permission/PermissionList";
import {createStyles, makeStyles} from "@material-ui/styles";
import {Index, App, State} from "../../generated/graphql";


const useStyles = makeStyles(() =>
    createStyles({
        marginDivider: {
            marginBottom: 5
        }
    }),
);

type ServiceDisplayProps = {
    workflow:{
        _id: string,
        name: Array<string>,
        owner: Array<string>,
        description: Array<string>,
        dataClassification: Array<string>,
        read: Array<Array<string>>,
        write: Array<Array<string>>,
        indexes: Array<Array<Index>>,
        apps: Array<Array<App>>,
        state: State
    }
}

const ServiceDisplayCombined: React.FunctionComponent<ServiceDisplayProps> = ({workflow}: ServiceDisplayProps) => {
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
                    {workflow.name[0]}
                </Grid>
                <Grid item md={6}>
                    {workflow.name[1]}
                </Grid>
                <Grid item md={2}>
                    Owner
                </Grid>
                <Grid item md={4}>
                    {workflow.owner[0]}
                </Grid>
                <Grid item md={6}>
                    {workflow.owner[1]}
                </Grid>
                <Grid item md={2}>
                    State
                </Grid>
                <Grid item md={4}>
                    {workflow.state}
                </Grid>
                <Grid item md={6}>
                    ACTIVE
                </Grid>
                <Grid item md={2}>
                    Description
                </Grid>
                <Grid item md={4}>
                    {workflow.description[0]}
                </Grid>
                <Grid item md={6}>
                    {workflow.description[1]}
                </Grid>
                <Grid item md={2}>
                    Data classification
                </Grid>
                <Grid item md={4}>
                    {workflow.dataClassification[0]}
                </Grid>
                <Grid item md={6}>
                    {workflow.dataClassification[1]}
                </Grid>
            </Grid>
            <Typography variant='h5'>Indexes</Typography>
            <Divider className={classes.marginDivider}/>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <IndexList data={workflow.indexes[0]} />
                </Grid>
                <Grid item md={6}>
                    <IndexList data={workflow.indexes[1]} />
                </Grid>
            </Grid>
            <Typography variant='h5'>Apps and addons</Typography>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <AppList data={workflow.apps[0]} />
                </Grid>
                <Grid item md={6}>
                    <AppList data={workflow.apps[1]} />
                </Grid>
            </Grid>
            <Typography variant='h5'>Access options</Typography>
            <Divider className={classes.marginDivider}/>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <PermissionList read={workflow.read[0]} write={workflow.write[0]} />
                </Grid>
                <Grid item md={6}>
                    <PermissionList read={workflow.read[1]} write={workflow.write[1]} />
                </Grid>
            </Grid>
            <Divider className={classes.marginDivider}/>
        </div>
    )
}

export default ServiceDisplayCombined;