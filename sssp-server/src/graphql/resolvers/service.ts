/**
 * File containing all service queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose from 'mongoose';
import {FutureService, Service, State} from '../../models/service';
import {ApolloError} from 'apollo-server';
import {deepEqual} from '../../helper/equality';
import {AppInterface} from '../../models/service'


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

        if((kind === Kind.FUTURE || kind === Kind.NEWEST) && futureService) {
            console.log(futureService);
            return futureService;
        }
        else if((kind === Kind.CURRENT || kind === Kind.NEWEST) && service) {
            console.log(service);
            return service;
        }
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

        if(futureService && (futureService.state === State.IN_CREATION || futureService.state === State.IN_DELETION)) {
            return await FutureService.findByIdAndUpdate(serviceId, {
                ...serviceInput,
                apps: serviceInput.apps.map((e: AppInterface): AppInterface => {
                    const currentApp = futureService.apps.filter((f: AppInterface) => f.name === e.name);
                    if(currentApp.length > 0) {
                        return {
                            ...e,
                            url: currentApp[0].url
                        }
                    }
                    else {
                        return e;
                    }
                })
            })
        }
        else {
            let futureServiceSaved;
            let serviceSaved = service;

            if(futureService) {
                futureServiceSaved = await FutureService.findByIdAndUpdate(serviceId, {
                    ...serviceInput,
                    apps: serviceInput.apps.map((e: AppInterface): AppInterface => {
                        const currentApp = futureService.apps.filter((f: AppInterface) => f.name === e.name);
                        if(currentApp.length > 0) {
                            return {
                                ...e,
                                url: currentApp[0].url
                            }
                        }
                        else {
                            return e;
                        }
                    })
                },{
                    new: true
                });

                console.log(futureService);
            }
            else {
                serviceSaved = await Service.findByIdAndUpdate(serviceId, {
                    state: State.IN_MODIFICATION
                },{
                    new: true
                });
                const newFutureService = new FutureService({
                    ...serviceInput,
                    _id: service._id,
                    state: State.IN_MODIFICATION,
                    revision: serviceSaved.revision,
                    apps: serviceInput.apps.map((e: AppInterface): AppInterface => {
                        const currentApp = service.apps.filter((f: AppInterface) => f.name === e.name);
                        if(currentApp.length > 0) {
                            return {
                                ...e,
                                url: currentApp[0].url
                            }
                        }
                        else {
                            return e;
                        }
                    })
                });
                futureServiceSaved = await newFutureService.save();
            }

            // Verify if future state is same as active state, if true it resets the future state
            if(deepEqual(serviceSaved._doc, futureServiceSaved._doc)) {
                await FutureService.findByIdAndDelete(serviceId);
                return await Service.findByIdAndUpdate(serviceId, {
                    state: State.ACTIVE
                });
            }
            else {
                return futureServiceSaved;
            }
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
            await Service.findByIdAndUpdate(serviceId, {
                state: State.IN_DELETION
            });
            if(!futureService) {
                const newFutureService = new FutureService({
                    ...service._doc,
                    state: State.IN_DELETION
                })
                return newFutureService.save();
            }
            else {
                return await FutureService.findByIdAndUpdate(serviceId, {
                    ...service._doc,
                    state: State.IN_DELETION
                },{
                    new: true
                });
            }
        }
    }
};

export {ServiceQueries, ServiceMutations};