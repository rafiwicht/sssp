import React from 'react';
import {
    GetServicesDocument,
    MutationPutServiceArgs,
    ServiceInput,
    usePutServiceMutation
} from '../../generated/graphql';
import ServiceMod from './ServiceMod';
import { useHistory } from 'react-router-dom';




const ServiceCreate: React.FC = () => {
    const [putService] = usePutServiceMutation({
        refetchQueries: [{query: GetServicesDocument}]
    });

    let history = useHistory();

    const handleSubmit = (args : MutationPutServiceArgs) => {
        putService({
            variables: args
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