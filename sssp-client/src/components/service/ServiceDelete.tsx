import React from "react";
import {useParams, useHistory} from "react-router-dom";
import {Button, Divider, Typography} from "@material-ui/core";
import {GetServicesDocument, useDeleteServiceMutation} from "../../generated/graphql";
import {createStyles, makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() =>
    createStyles({
        marginButton: {
            marginTop: 5,
            marginBottom: 5,
            marginRight: 5
        }
    }),
);

type ServiceDeleteParams = {
    id: string
}

/**
 * Simply delete page to confirm the request
 * @param AppProps 
 */
const ServiceDelete: React.FC = () => {
    const { id }: ServiceDeleteParams = useParams();
    const classes = useStyles();

    let history = useHistory();

    const [deleteService] = useDeleteServiceMutation({
        refetchQueries: [{query: GetServicesDocument}]
    });

    const handleCancel = () => {
        history.push('/service')
    };

    const handleSubmit = () => {
        deleteService({variables: {
            serviceId: id
            }}).then(() => {
                history.push(`/service/details/${id}`)
        });
    };

    return (
        <div>
            <Typography variant='h6'>Do you realy want to delete?</Typography>
            <Divider />
            <Button
                variant='contained'
                className={classes.marginButton}
                onClick={() => handleCancel()}
            >Cancel</Button>
            <Button
                variant='contained'
                color='secondary'
                className={classes.marginButton}
                onClick={() => handleSubmit()}
            >Delete</Button>
        </div>

    );
}
export default ServiceDelete;