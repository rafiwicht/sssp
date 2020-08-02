import React, {useEffect} from "react";
import {Typography} from "@material-ui/core";
import AdminList from "./AdminList";
import AdminAdd from "./AdminAdd";
import {useGetAdminsLazyQuery} from "../../generated/graphql";


const Admin: React.FC = () => {
    const [getAdmins, {data, error, loading}] = useGetAdminsLazyQuery();

    useEffect(() => {
        getAdmins();
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return (
        <div>
            <Typography variant="h3">Admin</Typography>
            <AdminAdd />
            <AdminList data={data.admins}/>
        </div>
    );
}
export default Admin;