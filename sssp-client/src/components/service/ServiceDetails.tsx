import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import {Kind, State, useGetServiceLazyQuery} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";
import IndexList from "../index/IndexList";
import UserList from "../user/UserList";
import AppList from "../app/AppList";
import ServiceDisplay from "./ServiceDisplay";

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
        margin: {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5
        },
    }),
);

type ServiceDetailsParams = {
    id: string
}

const ServiceDetails: React.FC = () => {
    const { id }: ServiceDetailsParams = useParams();
    const classes = useStyles();

    const [kind, setKind] = useState<Kind>(Kind.Future);

    let history = useHistory();

    const [getService, {data, error, loading}] = useGetServiceLazyQuery( {
        variables: {
            serviceId: id,
            kind: kind
        }
    });

    useEffect(() => {
        getService();
    }, []);

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
            { data.service.state === State.InModification &&
            <FormControl className={classes.margin}>
                <InputLabel htmlFor='modState'>Modification state</InputLabel>
                <Select
                    id="modState"
                    value={kind}
                    onChange={(e: any) => setKind(e.target.value)}
                >
                    <MenuItem value={Kind.Future}>Future modifications</MenuItem>
                    <MenuItem value={Kind.Current}>Active state</MenuItem>
                </Select>
            </FormControl>
            }
            <Typography variant='h3'>Service Details</Typography>
            <ServiceDisplay
                service={data.service} />
            <Button
                variant='contained'
                className={classes.marginButton}
                onClick={() => handleClose()}
            >Close</Button>
        </div>

    );
}
export default ServiceDetails;