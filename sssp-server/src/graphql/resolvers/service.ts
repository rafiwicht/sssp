/**
 * File containing all service queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose from 'mongoose';
import Service, {ServiceInterface} from '../../models/service';
import {transformService} from './merge';
import GitConnectorInterface from "../../git-connector";
import GithubConnector from "../../git-connector/github";

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


const bc: GitConnectorInterface = new GithubConnector();

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
                state: 'on creation'
            });
            const savedService = await newService.save();

            savedService.apps.forEach((e) => {
                bc.create(e.name,[],[], e.type);
            });

            return transformService(savedService);
        }
    },
    updateService: async (parent: any, {serviceId, serviceInput}: any, context: any) => {
        const service = await Service.findByIdAndUpdate(serviceId,serviceInput);
        return transformService(service);
    },
    deleteService: async (parent: any, {serviceId}: any) => {
        const service = await Service.findByIdAndDelete(serviceId);
        return transformService(service);
    }
};

export {ServiceQueries, ServiceMutation};