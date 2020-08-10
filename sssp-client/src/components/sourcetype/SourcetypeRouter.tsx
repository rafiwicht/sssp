import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import SourcetypeHelper from "./SourcetypeHelper";

const SourcetypeRouter: React.FC = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/helper/:serviceId/:sourcetypeId`}>
                <SourcetypeHelper />
            </Route>
        </Switch>
    );
}

export default SourcetypeRouter;