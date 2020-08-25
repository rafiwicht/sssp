import React, {useEffect} from 'react';
import {Kind, useGetServicesLazyQuery} from '../../generated/graphql';
import {useHistory} from 'react-router-dom';
import {Typography} from '@material-ui/core';
import ServiceList, {ServiceSimple} from '../service/ServiceList';


const Workflow: React.FC = () => {

    const [getServices, {data, loading, error}] = useGetServicesLazyQuery({
        variables: {
            kind: Kind.Future
        }
    });

    let history = useHistory();

    const handleDetails = (id: string) => {
        history.push( `/workflow/details/${id}`);
    }

    useEffect(() => {
        getServices();
    },[]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    const services: Array<ServiceSimple> = data.services.map((e) => {
        return {
            _id: e._id,
            name: e.name,
            owner: e.owner,
            state: e.state,
            dataClassification: e.dataClassification
        };
    })

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