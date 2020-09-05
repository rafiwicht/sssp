import { Typography, Divider } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { ServiceInput } from '../../generated/graphql';
import UserForm from '../permission/PermissionForm';
import UserModList from '../permission/PermissionModList';


type ServiceModStepPermissionProps = {
    serviceInput: ServiceInput,
    handlePermissionDelete: (userId: string) => void,
    handlePermissionAdd: (userId: string) => void,
    handleAccessChange: (userId: string, event: ChangeEvent<HTMLInputElement>) => void
}

const ServiceModStepPermission: React.FunctionComponent<ServiceModStepPermissionProps> = ({
    serviceInput, handlePermissionDelete, handlePermissionAdd, handleAccessChange}: ServiceModStepPermissionProps) => {
    return (
        <div>
            <Typography variant='h5'>Permissions</Typography>
            <Divider />
            <UserModList
                read={serviceInput.read || []}
                write={serviceInput.write}
                handleAccessChange={handleAccessChange}
                handlePermissionDelete={handlePermissionDelete} />
            <UserForm
                submitUser= {handlePermissionAdd} />
        </div>
    );
}

export default ServiceModStepPermission;