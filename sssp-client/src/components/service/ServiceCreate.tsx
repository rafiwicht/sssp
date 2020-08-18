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
        }).catch((r) => {
            console.log(r);
        });
    }


    return (
        <div>
            <ServiceMod
                handleSubmit={handleSubmit}
            />
        </div>

    );
}
export default ServiceCreate;