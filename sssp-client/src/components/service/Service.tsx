import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Typography} from '@material-ui/core';
import ServiceList from './ServiceList';
import {useGetServicesLazyQuery} from '../../generated/graphql';


const Service: React.FC = () => {
    const [getServices, {data, loading, error}] = useGetServicesLazyQuery();

    let history = useHistory();

    const handleCreate = () => {
        history.push('/service/create');
    }

    const handleDetails = (id: string) => {
        history.push(`/service/details/${id}`);
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

    return (
        <div>
            <Typography variant='h3'>Services</Typography>
            <Button variant='contained' color='primary' onClick={() => handleCreate()}>Create</Button>
            <ServiceList
                data={data.services}
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

export default Service;