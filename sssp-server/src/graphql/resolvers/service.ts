import Service from '../../models/service';
import {ApolloError} from 'apollo-server';
import {deleteElement, getElements, putElement} from "./generator";


export enum Kind {
    CURRENT = 'CURRENT',
    FUTURE = 'FUTURE',
    NEWEST = 'NEWEST'
}

const ServiceQueries = {
    services: async (parent: any, {}: any, context: any) => getElements(Service, context),
    service: async (parent: any, {serviceId}: any, context: any) => {
        const service = await Service.findById(serviceId);

        if(service && context.services.includes(serviceId)) {
            return service._doc;
        }
        else return new ApolloError('Service not found', 'NOT_FOUND');
    }
};

const ServiceMutations = {
    putService: async (parent: any, params: any, context: any) => putElement(Service, params, context),
    deleteService: async (parent: any, params, context: any) => deleteElement(Service, params, context)
};

export {ServiceQueries, ServiceMutations};
