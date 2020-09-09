import React, { useEffect } from "react";
import {useHistory, useParams} from "react-router-dom";
import {Paper, Tabs, Tab, Divider, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import TabPanel from "../helper/TabPanel";
import ServiceMod from "./ServiceMod";
import { useGetServiceLazyQuery } from "../../generated/graphql";
import Index from "../index/Index";
import App from '../app/App';
import Http from '../http/Http';
import Server from '../server/Server';
import Syslog from '../syslog/Syslog';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    marginButton: {
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5
    },
});

type ServiceDetailsParams = {
    id: string
}

const ServiceDetails: React.FC = () => {
    const classes = useStyles();
    const {id}: ServiceDetailsParams = useParams();
    const history = useHistory();
    const [value, setValue] = React.useState(0);

    const [getService, {data, loading, error}] = useGetServiceLazyQuery({
        variables: {
            serviceId: id
        }
    });

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleCancel = () => {
        history.push('/service');
    }

    const handleDelete = () => {
        history.push(`/service/delete/${id}`)
    }

    const handleCancelSamePage = () => {
        history.push(`/service/details/${id}`);
    }

    useEffect(() => {
        getService();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Service options" />
                    <Tab label="Indexes" />
                    <Tab label="Apps and addons" />
                    <Tab label="Http inputs" />
                    <Tab label="Server inputs" />
                    <Tab label="Syslog inputs" />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <Typography>State: {data.service.state}</Typography>
                <ServiceMod 
                    handleCancel={handleCancelSamePage}
                    serviceMod={data.service}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Index 
                    serviceId={id}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <App 
                    serviceId={id}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Http 
                    serviceId={id}
                />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Server 
                    serviceId={id}
                />
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Syslog 
                    serviceId={id}
                />
            </TabPanel>
            <Divider />
            <Button
                variant='contained'
                className={classes.marginButton}
                onClick={() => handleCancel()}
            >Back</Button>
            <Button
                variant='contained'
                color='secondary'
                className={classes.marginButton}
                onClick={() => handleDelete()}
            >Delete</Button>
        </div>

    )
}
export default ServiceDetails;