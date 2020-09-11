import React from 'react';
import ServiceMod from './ServiceMod';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';




const ServiceCreate: React.FC = () => {

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