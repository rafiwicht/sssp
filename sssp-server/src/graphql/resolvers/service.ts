/**
 * File containing all service queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose from 'mongoose';
import {AppInterface, Service, ServiceInterface, State} from '../../models/service';
import {transformService} from './merge';
import {ApolloError} from 'apollo-server';


const ServiceQueries = {
    services: async (parent: any, {kind}: any) => {
        const services = await Service.find();
        return services.map((service: ServiceInterface) => {
            return transformService(service, kind);
        });
    },
    service: async (parent: any, {serviceId, kind}: any) => {
        const service = await Service.findById(serviceId);
        if(!service) throw new ApolloError('Service not found', 'NOT_FOUND');
        return transformService(service, kind);

    }
};

const ServiceMutations = {
    createService: async (parent: any, {serviceInput}: any) => {
        const service = await Service.findOne({
            name: serviceInput.name
        });
        if (service) {
            throw new ApolloError('Service already Exists');
        } else {

            const newService = new Service({
                ...serviceInput,
                _id: new mongoose.Types.ObjectId(),
                state: State.IN_CREATION,
                apps: serviceInput.apps.map(e => {
                    return {
                        ...e,
                        _id: new mongoose.Types.ObjectId(),
                        url: 'in creation'
                    };
                })
            });
            const savedService = await newService.save();

            return transformService(savedService);
        }
    },
    updateService: async (parent: any, {serviceId, serviceInput}: any) => {
        const service: ServiceInterface = await Service.findById(serviceId);
        if(!service) throw new ApolloError('Service not found', 'NOT_FOUND');

        if(service.state === State.ACTIVE || service.state === State.IN_MODIFICATION) {
            const currentApps = service.apps.map(e => {
                return e.name
            });
            const newApps = serviceInput.apps.map(e => {
                return e.name
            });

            // Delete apps
            const appsInCreation = newApps.filter(e => !currentApps.includes(e));

            const updatedService = await Service.findByIdAndUpdate(serviceId, {
                state: State.IN_MODIFICATION,
                futureService: {
                    ...serviceInput,
                    revision: (service.futureService === null) ? service.revision + 1 : service.futureService.revision,
                    apps: serviceInput.apps.map((e: AppInterface) => {
                        if (appsInCreation.includes(e.name)) {
                            return {
                                ...e,
                                _id: new mongoose.Types.ObjectId(),
                                url: 'in creation'
                            };
                        } else {
                            return {
                                ...e,
                                _id: new mongoose.Types.ObjectId()
                            };
                        }
                    })
                }
            });
            return transformService(updatedService.futureService);
        }
        else {
            const updatedService = await Service.findByIdAndUpdate(serviceId, {
                ...serviceInput,
                apps: serviceInput.apps.map(e => {
                    return {
                        ...e,
                        _id: new mongoose.Types.ObjectId(),
                        url: 'in creation'
                    };
                })
            });
            return transformService(updatedService);
        }
    },
    deleteService: async (parent: any, {serviceId}: any) => {
        if(await Service.exists({_id: serviceId})) throw new ApolloError('Service not found', 'NOT_FOUND');
        const updatedService = await Service.findByIdAndUpdate(serviceId, {
            state: State.IN_DELETION,
            futureService: null
        });
        return transformService(updatedService);
    }
};

export {ServiceQueries, ServiceMutations};