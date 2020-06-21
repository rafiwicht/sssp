/**
 * File containing all index queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {PubSub} from 'apollo-server';
import mongoose from 'mongoose';
import Idx from '../../models/idx';
import {transformIdx} from './merge';

const pubSub = new PubSub();

const IDX_ADDED = 'IDX_ADDED';

/**
 * Idx Queries
 * indexes: [Idx!]!
 index(idxId: ID!): Index!
 }
 type Mutation {
    createIndex(createIndex: CreateIndex): Index!
  }
 type Subscription {
    idxAdded: Idx
 */
const IdxQueries = {
    indexes: async (parent, args, context) => {
        // If not authenticated throw error
        if (!context.isAuth) {
            throw new Error('Non Authenticated');
        }
        try {
            const users = await Idx.find();
            return users.map((user) => {
                return transformIdx(user);
            });
        } catch (err) {
            throw err;
        }
    },
    index: async (parent, {idxId}, context) => {
        // If not authenticated throw error
        if (!context.isAuth) {
            throw new Error('Non Authenticated');
        }
        try {
            const user = await Idx.findById(idxId);
            return transformIdx(user);
        } catch (err) {
            throw err;
        }
    }
};

/**
 * Idx Mutations
 */
const IdxMutation = {
    createIndex: async (parent: any, {idxInput}: any) => {
        try {
            const idx = await Idx.findOne({
                name: idxInput.name
            });
            if (idx) {
                throw new Error('User already Exists');
            } else {
                const newIdx = new Idx({
                    _id: new mongoose.Types.ObjectId(),
                    service: idxInput.service,
                    frozenTimePeriodInSecs: idxInput.frozenTimePeriodInSecs,
                    maxTotalDataSizeMB: idxInput.maxTotalDataSizeMB
                });
                const savedIdx = await newIdx.save();
                await pubSub.publish(IDX_ADDED, {
                    idxAdded: transformIdx(savedIdx)
                });

                return {
                    savedIdx: savedIdx.id
                };
            }
        } catch (error) {
            throw error;
        }
    }
};

/**
 * Idx Subscriptions
 */
const IdxSubscription = {
    idxAdded: {
        subscribe: () => pubSub.asyncIterator([IDX_ADDED])
    }
};

export {IdxQueries, IdxMutation, IdxSubscription};
