import React from 'react';
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Workflow from "./Workflow";
import WorkflowDetails from "./WorkflowDetails";


const WorkflowRouter: React.FC = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <Workflow />
            </Route>
            <Route path={`${path}/details/:id`}>
                <WorkflowDetails />
            </Route>
        </Switch>
    );
};

export default WorkflowRouter;