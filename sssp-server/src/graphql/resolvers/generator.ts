/**
 * Generating resolvers for models
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {ApolloError, ForbiddenError} from "apollo-server";
import {State} from "../../models";
import {subsetEqual} from "../../helper/equality";


export const getElements = async (model: any, context: any) => {
    let results;

    if(context.admin) {
        results = await model.find();
    }
    else {
        results = await model.find({
            _id: { $in: context.services}
        });
    }

    return results.map((e) => {
        return e._doc;
    });
}

export const getElement = async (model: any, {id}: any, context: any) => {
    const result = await model.findById(id);

    if(result && context.services.includes(result.serviceId)) {
        return result._doc;
    }
    else return new ApolloError('Not found', 'NOT_FOUND');
}

export const putElement = async (model: any, {id, input}: any, context: any) => {
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
        if(!context.services.includes(result.serviceId) && !context.admin) {
            return new ForbiddenError('Not allowed!');
        }

        // Updates elements which are in creation
        if(result.state === State.IN_CREATION) {
            return await model.findByIdAndUpdate(result.serviceId, {
                ...input,
                state: State.IN_CREATION
            },{
                new: true
            });
        }
        else {
            // Updates elements which are in deletion and modificationb
            const serviceSaved = await model.findByIdAndUpdate(id, {
                changes: {
                    ...input
                }
            },{
                new: true
            });


            // Verify if future state is same as active state, if true it resets the future state
            if(subsetEqual(serviceSaved._doc_changes, serviceSaved._doc)) {
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

export const deleteElement = async (model: any, {id}: any, context: any) => {
    if(!context.services.includes(id) && !context.admin) {
        return new ForbiddenError('Not allowed!');
    }

    const service = await model.findById(id);
    if(!service) {
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