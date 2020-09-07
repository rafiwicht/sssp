import { Typography, Divider } from '@material-ui/core';
import React from 'react';
import { IndexInput, ServiceInput, AppInput } from '../../generated/graphql';
import AppForm from '../app/AppForm';
import AppModList from '../app/AppModList';
import IndexForm from '../index/IndexForm';
import IndexModList from '../index/IndexModList';

type ServiceModStepIndexAppProps = {
    serviceInput: ServiceInput
    handleIndexAdd: (indexInput: IndexInput) => void,
    handleIndexDelete: (id: number) => void,
    handleAppAdd: (appInput: AppInput) => void,
    handleAppDelete: (id: number) => void
}



const ServiceModStepIndexApp: React.FunctionComponent<ServiceModStepIndexAppProps> = ({
    serviceInput, handleAppAdd, handleAppDelete, handleIndexAdd, handleIndexDelete}: ServiceModStepIndexAppProps) => {

    return (
        <div>
            <Typography variant='h5'>Indexes</Typography>
            <Divider />
            <IndexModList
                handleDelete={handleIndexDelete}
                data={serviceInput.indexes || []} />
            <IndexForm
                submitIndex={handleIndexAdd}/>
            <Typography variant='h5'>Apps and addons</Typography>
            <Divider />
            <AppModList
                data={serviceInput.apps || []}
                handleDelete={handleAppDelete} />
            <AppForm
                submitApp={handleAppAdd} />
        </div>
    );
}

export default ServiceModStepIndexApp;