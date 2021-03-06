/**
 * Generating resolvers for models
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {ApolloError, ForbiddenError} from "apollo-server";
import {State} from "../../models";
import {subsetEqual} from "../../helper/equality";

export const getElements = async (model: any, serviceId: string, onlyModifications: boolean, context: any) => {
    let searchQuery: any = {}

    // Restrict access for multi tenancy
    if(serviceId) {
        if(!context.admin && !context.read.includes(serviceId)) {
            return new ApolloError('Not found', 'NOT_FOUND');
        }
        searchQuery.serviceId = serviceId;   
    }
    else if(!serviceId && !context.admin) {
        searchQuery._id = { $in: context.read };
    }
    
    if(onlyModifications) {
        searchQuery.state = { $ne: State.ACTIVE };
    }

    const results = await model.find(searchQuery);

    return results.map((e) => {
        return e._doc;
    });
}

export const getElement = async (model: any, id: any, context: any) => {
    const result = await model.findById(id);

    // Restrict access for multi tenancy
    if(result && context.read.includes(result.serviceId)) {
        return result._doc;
    }
    else return new ApolloError('Not found', 'NOT_FOUND');
}

export const putElement = async (model: any, id: string, input: any, context: any) => {
    const result = await model.findById(id);

    // If the element does not exists
    if (!result) {
        const resultNew = new model({
            ...input,
            _id: id,
            state: State.IN_CREATION
        });
        return resultNew.save();
    }
    // If the element exist
    else {
        // Verify permissions
        if(!context.write.includes(result.serviceId) && !context.admin) {
            return new ForbiddenError('Not allowed!');
        }

        // Updates elements which are in creation
        if(result.state === State.IN_CREATION) {

            return await model.findByIdAndUpdate(id, {
                ...input,
                state: State.IN_CREATION
            },{
                new: true
            });
        }
        else {
            // Updates elements which are in deletion and modificationb
            const serviceSaved = await model.findByIdAndUpdate(id, {
                $set: {
                    changes: {
                        ...input
                    },
                    state: State.IN_MODIFICATION
                }
                
            },{
                new: true
            });

            // Verify if future state is same as active state, if true it resets the future state
            if(subsetEqual(serviceSaved._doc.changes, serviceSaved._doc)) {
                return await model.findByIdAndUpdate(id, {
                    $set: {
                        state: State.ACTIVE
                    },
                    $unset: {
                        changes: {}
                    }
                },{
                    new: true
                });
            }
            else {
                return serviceSaved;
            }
        }

    }
}

export const deleteElement = async (model: any, id: string, context: any) => {
    if(!context.write.includes(id) && !context.admin) {
        return new ForbiddenError('Not allowed!');
    }

    const element = await model.findById(id);
    if(!element) {
        return new ApolloError('Not found', 'NOT_FOUND');
    }
    else {
        return await model.findByIdAndUpdate(id, {
            $set: {
                state: State.IN_DELETION
            }
        },{
            new: true
        });
    }
}
