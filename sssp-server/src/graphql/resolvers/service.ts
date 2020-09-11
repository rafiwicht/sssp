/**
 * Resolver for the service queries and mutations
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import Service from '../../models/service';
import {State} from '../../models';
import {ApolloError} from 'apollo-server';
import {deleteElement, putElement} from "./generator";


export enum Kind {
    CURRENT = 'CURRENT',
    FUTURE = 'FUTURE',
    NEWEST = 'NEWEST'
}

const ServiceQueries = {
    services: async (parent: any, {onlyModifications = false}: any, context: any) => {
        let searchQuery: any = {}
    
        // Restrict access for multi tenancy
        if(!context.admin) {
            searchQuery._id = { $in: context.read };
        }

        if(onlyModifications) {
            searchQuery.state = { $ne: State.ACTIVE };
        }

        const results = await Service.find(searchQuery);
    
        return results.map((e) => {
            return e._doc; 
        });
    },
    service: async (parent: any, {serviceId}: any, context: any) => {
        const service = await Service.findById(serviceId);

        if(service && (context.admin || context.read.includes(serviceId))) {
            return service._doc;
        }
        else return new ApolloError('Service not found', 'NOT_FOUND');
    }
};

const ServiceMutations = {
    putService: async (parent: any, {serviceId, serviceInput}: any, context: any) => putElement(Service, serviceId, serviceInput, context),
    deleteService: async (parent: any, {serviceId}: any, context: any) => deleteElement(Service, serviceId, context)
};

export {ServiceQueries, ServiceMutations};
