import React from "react";
import {withRouter} from "react-router-dom";
import {Typography} from "@material-ui/core";
import ServiceTable from "./ServiceTable";


const Service: React.FC = () => {
    return (
        <div>
            <Typography variant="h3">Services</Typography>
            <ServiceTable />
        </div>
    );
}

export default withRouter(Service);