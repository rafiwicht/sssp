/**
 * File containing all service queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose from 'mongoose';
import Service, {AppInterface, ServiceInterface} from '../../models/service';
import {transformService} from './merge';
import GithubConnector from "../../git-connector/github";
import GitConnectorInterface from "../../git-connector";
import config from '../../config';


let gitConnector: GitConnectorInterface;
if(config.githubToken) {
    gitConnector = new GithubConnector();
}

const ServiceQueries = {
    services: async () => {
        const services = await Service.find();
        return services.map((service: ServiceInterface) => {
            return transformService(service);
        });
    },
    service: async (parent: any, {serviceId}: any) => {
        const service = await Service.findById(serviceId);
        return transformService(service);

    }
};


const ServiceMutation = {
    createService: async (parent: any, {serviceInput}: any, context: any) => {
        const service = await Service.findOne({
            name: serviceInput.name
        });
        if (service) {
            throw new Error('Service already Exists');
        } else {

            const newService = new Service({
                ...serviceInput,
                _id: new mongoose.Types.ObjectId(),
                state: 'on creation',
                apps: serviceInput.apps.map(e => {
                    return {
                        ...e,
                        _id: new mongoose.Types.ObjectId(),
                        url: gitConnector.createRepo(e.name,[],[], e.type)
                    };
                })
            });
            const savedService = await newService.save();

            console.log(savedService);

            return transformService(savedService);
        }
    },
    updateService: async (parent: any, {serviceId, serviceInput}: any, context: any) => {

        const service: ServiceInterface = await Service.findById(serviceId);

        const currentApps = service.apps.map(e => {
            return e.name
        });
        const newApps = serviceInput.apps.map(e => {
            return e.name
        });

        // Delete apps
        currentApps.filter(e => !newApps.includes(e)).forEach(e => {
            gitConnector.deleteRepo(e);
        })

        const updatedService = await Service.findByIdAndUpdate(serviceId, {
            ...serviceInput,
            apps: serviceInput.apps.map(e => {
                return {
                    ...e,
                    _id: new mongoose.Types.ObjectId(),
                    url: gitConnector.createRepo(e.name,[],[], e.type)
                };
            })
        });
        return transformService(updatedService);
    },
    deleteService: async (parent: any, {serviceId}: any) => {
        const service = await Service.findByIdAndDelete(serviceId);
        service.apps.forEach((e: AppInterface) => {
            gitConnector.deleteRepo(e.name);
        })
        return transformService(service);
    }
};

export {ServiceQueries, ServiceMutation};