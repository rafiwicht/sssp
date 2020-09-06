import Service from '../../models/service';
import {ApolloError, ForbiddenError} from 'apollo-server';
import {State} from '../../models'


export enum Kind {
    CURRENT = 'CURRENT',
    FUTURE = 'FUTURE',
    NEWEST = 'NEWEST'
}

const ServiceQueries = {
    services: async (parent: any, {}: any, context: any) => {
        let resultServices;

        if(context.admin) {
            resultServices = await Service.find();
        }
        else {
            resultServices = await Service.find({
                _id: { $in: context.services}
            });
        }

        return resultServices.map((service) => {
            return service._doc;
        });
    },
    service: async (parent: any, {serviceId}: any, context: any) => {
        const service = await Service.findById(serviceId);

        if(service && context.services.includes(serviceId)) {
            return service._doc;
        }
        else return new ApolloError('Service not found', 'NOT_FOUND');
    }
};

const ServiceMutations = {
    createService: async (parent: any, {serviceInput}: any) => {
        const service = await Service.findById(serviceInput._id);

        if (service) {
            return new ApolloError('Service already exists');
        } 
        else {
            const serviceNew = new Service({
                ...serviceInput,
                state: State.IN_CREATION
            });
            return serviceNew.save();
        }
    },
    updateService: async (parent: any, {serviceInput}: any, context: any) => {
        if(!context.services.includes(serviceInput._id) && !context.admin) {
            return new ForbiddenError('Not allowed!');
        }

        const service = await Service.findById(serviceInput.serviceId);

        if(!service) {
            throw new ApolloError('Service not found', 'NOT_FOUND');
        }

        if(service.state === State.IN_CREATION) {
            return await Service.findByIdAndUpdate(serviceInput._id, {
                ...serviceInput,
                state: State.IN_CREATION
            },{
                new: true
            });
        }
        else {
            delete serviceInput._id;
            const serviceSaved = await Service.findByIdAndUpdate(serviceInput._id, {
                changes: {
                    ...serviceInput
                }
            },{
                new: true
            });
            

            // Verify if future state is same as active state, if true it resets the future state
            if(serviceSaved._doc.owner === serviceSaved._doc_changes.owner
                || serviceSaved._doc.description === serviceSaved._doc_changes.description
                || serviceSaved._doc.dataClassification === serviceSaved._doc_changes.dataClassification) {

                return await Service.findByIdAndUpdate(serviceInput._id, {
                    state: State,
                    $unset: { changes: {} }
                },{
                    new: true
                });
            }
            else {
                return serviceSaved;
            }
        }
    },
    deleteService: async (parent: any, {serviceId}: any, context: any) => {
        if(!context.services.includes(serviceId) && !context.admin) {
            return new ForbiddenError('Not allowed!');
        }

        const service = await Service.findById(serviceId);
        if(!service) {
            return new ApolloError('Service not found', 'NOT_FOUND');
        }
        else {
            return await Service.findByIdAndUpdate(serviceId, {
                state: State.IN_DELETION
            },{
                new: true
            });
        }
    }
};

export {ServiceQueries, ServiceMutations};
