import React, {useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {
    GetServicesDocument, useAcceptWorkflowMutation, useDeclineWorkflowMutation,
    useGetWorkflowLazyQuery,

} from "../../generated/graphql";
import {Button} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/styles";
import ServiceDisplay from "../service/ServiceDisplay";

type WorkflowDetailsParams = {
    id: string
}

const useStyles = makeStyles(() =>
    createStyles({
        marginButton: {
            marginLeft: 5
        }
    }),
);

const WorkflowDetails: React.FC = () => {
    const {id}: WorkflowDetailsParams = useParams();
    const classes = useStyles();

    let history = useHistory();

    const [acceptWorkflow] = useAcceptWorkflowMutation({
        variables: {
            serviceId: id
        },
        refetchQueries: [{
            query: GetServicesDocument
        }]
    });

    const [declineWorkflow] = useDeclineWorkflowMutation({
        variables: {
            serviceId: id
        },
        refetchQueries: [{
            query: GetServicesDocument
        }]
    });

    const handleCancel = () => {
        history.push('/workflow');
    }

    const handleAccept = () => {
        acceptWorkflow().then(() => {
            history.push('/workflow');
        });
    }

    const handleDecline = () => {
        declineWorkflow().then(() => {
            history.push('/workflow');
        });
    }

    const [getWorkflow, {data, error, loading}] = useGetWorkflowLazyQuery({
        variables: {
            serviceId: id
        }
    });

    useEffect(() => {
        getWorkflow();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }
    let content;

    if(data.workflow.new && data.workflow.current) {

    }
    else if(data.workflow.new) {
        content = (<ServiceDisplay service={data.workflow.new} />);
    }

    else if(data.workflow.current) {
        content = (<ServiceDisplay service={data.workflow.current} />);
    }

    let buttons;

    if(data.workflow.new || data.workflow.current) {
        buttons = (
            <div>
                <Button
                    variant='contained'
                    color='primary'
                    className={classes.marginButton}
                    onClick={() => handleAccept()}
                >Accept</Button>
                <Button
                    variant='contained'
                    color='secondary'
                    className={classes.marginButton}
                    onClick={() => handleDecline()}
                >Decline</Button>
            </div>
        );
    }

    return (
        <div>
            {content}
            <Button
                variant='contained'
                className={classes.marginButton}
                onClick={() => handleCancel()}
            >Cancel</Button>
            {buttons}
        </div>
    );
}

export default WorkflowDetails;