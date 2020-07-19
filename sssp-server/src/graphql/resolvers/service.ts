/**
 * File containing all service queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose from 'mongoose';
import Service from '../../models/service';
import {transformService} from './merge';

const ServiceQueries = {
    services: async () => {
        const services = await Service.find();
        return services.map((service) => {
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
                _id: new mongoose.Types.ObjectId(),
                name: serviceInput.name,
                owner: serviceInput.owner,
                state: 'on creation',
                indexes: [],
                read: [],
                write: [context.userId]
            });
            const savedService = await newService.save();

            return transformService(savedService);
        }
    },
    updateService: async (parent: any, {serviceId, serviceInput}: any) => {
        const service = await Service.findByIdAndUpdate(serviceId,serviceInput);
        return transformService(service);
    },
    deleteService: async (parent: any, {serviceId}: any) => {
        const service = await Service.findByIdAndDelete(serviceId);
        return transformService(service);
    }
};

export {ServiceQueries, ServiceMutation};