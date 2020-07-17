import React, {useEffect} from "react";
import {RouteComponentProps, withRouter, useRouteMatch} from "react-router-dom";
import {Button, Typography} from "@material-ui/core";
import ServiceList from "./ServiceList";
import {useGetServicesLazyQuery} from "../../generated/graphql";


const Service: React.FunctionComponent<RouteComponentProps> = ({history}: RouteComponentProps) => {
    const [getServices, {data, loading, error}] = useGetServicesLazyQuery();
    const { path } = useRouteMatch();

    const handleCreate = () => {
        history.push(`${path}/create`)
    }

    useEffect(() => {
        getServices();
    },[]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }


    return (
        <div>
            <Typography variant="h3">Services</Typography>
            <Button variant='contained' color='primary' onClick={() => handleCreate()}>Create</Button>
            <ServiceList data={data.services}/>

        </div>
    );
}

export default withRouter(Service);