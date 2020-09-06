import React from 'react';
import {GetServicesDocument, ServiceInput, useCreateServiceMutation} from '../../generated/graphql';
import ServiceMod from './ServiceMod';
import { useHistory } from 'react-router-dom';


const ServiceCreate: React.FC = () => {
    const [createService] = useCreateServiceMutation({
        refetchQueries: [{query: GetServicesDocument}]
    });

    let history = useHistory();

    const handleSubmit = (serviceInput: ServiceInput) => {
        createService({
            variables: {
                serviceInput: serviceInput
            },
        }).then(() => {
            history.push('/service');
        });
    }

    const handleCancel = () => {
        history.push('/service')
    }

    return (
        <div>
            <ServiceMod
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
            />
        </div>

    );
}
export default ServiceCreate;