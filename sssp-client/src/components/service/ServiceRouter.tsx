import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Service from "./Service";
import ServiceCreate from "./ServiceCreate";
import ServiceDetails from "./ServiceDetails";
import ServiceDelete from "./ServiceDelete";

/**
 * Routes the subpach '/service'
 */
const ServiceRouter: React.FC = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <Service />
            </Route>
            <Route path={`${path}/create`}>
                <ServiceCreate />
            </Route>
            <Route path={`${path}/details/:id`}>
                <ServiceDetails />
            </Route>
            <Route path={`${path}/delete/:id`}>
                <ServiceDelete />
            </Route>
        </Switch>
    );
}

export default ServiceRouter;