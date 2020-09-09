import React from 'react';
import {
    GetServicesDocument,
    MutationPutServiceArgs,
    usePutServiceMutation
} from '../../generated/graphql';
import ServiceMod from './ServiceMod';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';




const ServiceCreate: React.FC = () => {
    const [putService] = usePutServiceMutation({
        refetchQueries: [{query: GetServicesDocument}]
    });

    let history = useHistory();
    
    const handleCancel = () => {
        history.push('/service')
    }

    return (
        <div>
            <Typography variant='h4'>Create service</Typography>
            <ServiceMod
                handleCancel={handleCancel}
            />
        </div>

    );
}
export default ServiceCreate;