/**
 * File containing all service queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose from 'mongoose';
import Service from '../../models/service';
import {transformService} from './merge';

const ServiceQueries = {
    services: async (parent, args, context) => {
        // If not authenticated throw error
        if (!context.isAuth) {
            throw new Error('Non Authenticated');
        }
        try {
            const services = await Service.find();
            return services.map((service) => {
                return transformService(service);
            });
        } catch (err) {
            throw err;
        }
    },
    service: async (parent, {serviceId}, context) => {
        // If not authenticated throw error
        if (!context.isAuth) {
            throw new Error('Non Authenticated');
        }
        try {
            const service = await Service.findById(serviceId);
            return transformService(service);
        } catch (err) {
            throw err;
        }
    }
};

const ServiceMutation = {
    createService: async (parent: any, {serviceInput}: any) => {
        try {
            const service = await Service.findOne({
                name: serviceInput.name
            });
            if (service) {
                throw new Error('Service already Exists');
            } else {
                const newService = new Service({
                    _id: new mongoose.Types.ObjectId(),
                    name: serviceInput.name,
                    owner: serviceInput.owner
                });
                const savedService = await newService.save();

                return transformService(savedService);
            }
        } catch (error) {
            throw error;
        }
    },
    updateService: async (parent: any, {serviceId, serviceInput}: any) => {
        try {
            const service = await Service.findByIdAndUpdate(serviceId,);
            return transformService(service);
        } catch (error) {
            throw error;
        }
    }
};

export {ServiceQueries, ServiceMutation};