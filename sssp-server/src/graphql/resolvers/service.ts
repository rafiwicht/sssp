/**
 * File containing all service queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose from 'mongoose';
import {FutureService, Service, State} from '../../models/service';
import {ApolloError} from 'apollo-server';


export enum Kind {
    CURRENT = 'CURRENT',
    FUTURE = 'FUTURE',
    NEWEST = 'NEWEST'
}

const ServiceQueries = {
    services: async (parent: any, {kind}: any) => {
        let resultServices;

        if (kind === Kind.FUTURE) resultServices = await FutureService.find();
        else if(kind === Kind.CURRENT) resultServices = await Service.find();
        else {
            const futureServices = await FutureService.find();
            const resultServicesIds = futureServices.map((service) => {
                return service._id;
            })
            const services = await Service.find({
                _id: { $nin: resultServicesIds}
            });
            resultServices = futureServices.concat(services);
        }

        return resultServices.map((service) => {
            return service;
        });
    },
    service: async (parent: any, {serviceId, kind}: any) => {

        const futureService = await FutureService.findById(serviceId);
        const service = await Service.findById(serviceId);

        if((kind === Kind.FUTURE || kind === Kind.NEWEST) && futureService) return futureService;
        else if((kind === Kind.CURRENT || kind === Kind.NEWEST) && service) return service;
        else throw new ApolloError('Service not found', 'NOT_FOUND');
    }
};

const ServiceMutations = {
    createService: async (parent: any, {serviceInput}: any) => {
        const service = await Service.findOne({
            name: serviceInput.name
        });
        const futureService = await FutureService.findOne({
            name: serviceInput.name
        });

        if (service || futureService) {
            throw new ApolloError('Service already Exists');
        } else {
            const newService = new FutureService({
                ...serviceInput,
                _id: new mongoose.Types.ObjectId(),
                state: State.IN_CREATION
            });
            return newService.save();
        }
    },
    updateService: async (parent: any, {serviceId, serviceInput}: any) => {
        const service = await Service.findById(serviceId);
        const futureService = await FutureService.findById(serviceId);
        if(!service && !futureService) {
            throw new ApolloError('Service not found', 'NOT_FOUND');
        }
        if(service && !futureService) {
            Service.findByIdAndUpdate(serviceId, {
                state: State.IN_MODIFICATION
            });
            const newService = new FutureService({
                ...serviceInput,
                _id: service._id,
                state: State.IN_MODIFICATION,
                revision: service.revision + 1
            });

            return newService.save();
        }

        else {
            const futureServiceSaved = await FutureService.findByIdAndUpdate(serviceId, {
                ...serviceInput
            });
            if(futureServiceSaved === service) {
                FutureService.findByIdAndDelete(serviceId);
                return Service.findByIdAndUpdate(serviceId, {
                    state: State.ACTIVE
                });
            }
            else return futureServiceSaved;
        }
    },
    deleteService: async (parent: any, {serviceId}: any) => {
        const service = await Service.findById(serviceId);
        const futureService = await FutureService.findById(serviceId);
        if(!service && !futureService) {
            throw new ApolloError('Service not found', 'NOT_FOUND');
        }
        if(!service) {
            return FutureService.findByIdAndDelete(serviceId);
        }
        else {
            Service.findByIdAndUpdate(serviceId, {
                state: State.IN_DELETION
            });

            return FutureService.findByIdAndUpdate(serviceId, {
                ...service._doc,
                state: State.IN_DELETION
            });
        }
    }
};

export {ServiceQueries, ServiceMutations};