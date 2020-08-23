


import Service from '../../models/service';
import {transformSourcetype} from './merge';


const SourcetypeQueries = {
    sourcetype: async (parent: any, {serviceId, sourcetypeId}: any) => {
        const service = await Service.findById(serviceId);
        return transformSourcetype(service.sourcetypes.id(sourcetypeId));

    }
};

const SourcetypeMutations = {
    updateSourcetype: async (parent: any, {serviceId, sourcetypeId, sourcetypeInput}: any, context: any) => {
        const service = await Service.findOneAndUpdate({
            '_id': serviceId,
            'sourcetypes._id': sourcetypeId
        }, {
            "$set": {
                "sourcetype.$": sourcetypeInput
            }
        });
        return transformSourcetype(service.sourcetypes.id(sourcetypeId));
    }
};

export {SourcetypeQueries, SourcetypeMutations};