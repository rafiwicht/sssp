import { Typography, Divider } from '@material-ui/core';
import React, { ChangeEvent, useEffect } from 'react';
import { ServiceInput } from '../../generated/graphql';
import UserForm from '../permission/PermissionForm';
import UserModList from '../permission/PermissionModList';
import config from "../../config";


type ServiceModStepPermissionProps = {
    serviceInput: ServiceInput,
    handlePermissionDelete: (userId: string) => void,
    handlePermissionAdd: (userId: string) => void,
    handleAccessChange: (userId: string, accessType: boolean) => void
}

const ServiceModStepPermission: React.FunctionComponent<ServiceModStepPermissionProps> = ({
    serviceInput, handlePermissionDelete, handlePermissionAdd, handleAccessChange}: ServiceModStepPermissionProps) => {

    useEffect(() => {
        if(config.addLDAPGroups === 'true') {
            if(serviceInput.read?.length === 0) {
                handlePermissionAdd(`${config.prefixLDAPGroups}${serviceInput.name.toLowerCase()}_read`);
            }
            if(serviceInput.write.length === 0) {
                handlePermissionAdd(`${config.prefixLDAPGroups}${serviceInput.name.toLowerCase()}_power`);
                handleAccessChange(`${config.prefixLDAPGroups}${serviceInput.name.toLowerCase()}_power`, true);
                handlePermissionAdd(localStorage.getItem('userId') || '');
                handleAccessChange(localStorage.getItem('userId') || '', true);
            }
        } 
    })


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