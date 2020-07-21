import React from "react";
import {Button, Typography} from "@material-ui/core";
import AdminList from "./AdminList";
import AdminAdd from "./AdminAdd";


const Admin: React.FC = () => {
    return (
        <div>
            <Typography variant="h3">Admin</Typography>
            <AdminAdd />
            <AdminList />
        </div>
    );
}
export default Admin;