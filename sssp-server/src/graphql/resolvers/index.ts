/**
 * Exporting all resolvers
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {IdxQueries, IdxMutation, IdxSubscription} from './idx';

const rootResolver = {
    Query: {
        ...IdxQueries,
    },
    Mutation: {
        ...IdxMutation,
    },
    Subscription: {
        ...IdxSubscription
    }
};

export default rootResolver;