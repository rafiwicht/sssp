import React, {useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {
    GetServicesDocument, useAcceptWorkflowMutation, useDeclineWorkflowMutation,
    useGetWorkflowLazyQuery, Kind, State
} from "../../generated/graphql";
import {Button} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/styles";
import ServiceDisplay from "../service/ServiceDisplay";
import ServiceDisplayCombined from './ServiceDisplayCombined';

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

    console.log(data);

    return (
        <div>
            {data.workflow.name.length === 1 ? <ServiceDisplay service={{
                _id: data.workflow._id,
                name: data.workflow.name[0],
                owner: data.workflow.owner[0],
                description: data.workflow.description[0],
                dataClassification: data.workflow.dataClassification[0],
                indexes: data.workflow.indexes[0],
                apps: data.workflow.apps[0],
                read: data.workflow.read[0],
                write: data.workflow.write[0],
                state: data.workflow.state
            }} /> : <ServiceDisplayCombined workflow={data.workflow} />}
            
            <div>
                <Button
                    variant='contained'
                    className={classes.marginButton}
                    onClick={() => handleCancel()}
                >Cancel</Button>
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
        </div>
            
        
    );
}

export default WorkflowDetails;