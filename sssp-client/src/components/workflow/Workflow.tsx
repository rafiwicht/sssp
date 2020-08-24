import React, {useEffect} from 'react';
import {useGetWorkflowsLazyQuery} from '../../generated/graphql';
import {useHistory} from 'react-router-dom';
import {Typography} from '@material-ui/core';
import ServiceList, {ServiceSimple} from '../service/ServiceList';


const Workflow: React.FC = () => {

    const [getWorkflows, {data, loading, error}] = useGetWorkflowsLazyQuery();

    let history = useHistory();

    const handleDetails = (id: string) => {
        history.push( `/workflow/details/${id}`);
    }

    useEffect(() => {
        getWorkflows();
    },[]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    const services: Array<ServiceSimple> = [];

    data.workflows.forEach((e) => {
        if (e.new) {
            services.push({
                _id: e.new._id,
                name: e.new.name,
                owner: e.new.owner,
                state: e.new.state,
                dataClassification: e.new.dataClassification
            });
        } else if (e.current) {
            services.push({
                _id: e.current._id,
                name: e.current.name,
                owner: e.current.owner,
                state: e.current.state,
                dataClassification: e.current.dataClassification
            });
        }
    });

    return (
        <div>
            <Typography variant="h3">Pending approval</Typography>
            <ServiceList
                data={services}
                buttons={[
                    {
                        text: 'Details',
                        color: 'primary',
                        onClick: handleDetails

                    }
                ]}
            />
        </div>
    );
}

export default Workflow;