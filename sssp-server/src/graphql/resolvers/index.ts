/**
 * Exporting all resolvers
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {IdxQueries, IdxMutation, IdxSubscription} from './idx';
import {UserQueries, UserMutation} from './user';

const rootResolver = {
    Query: {
        ...IdxQueries,
        ...UserQueries
    },
    Mutation: {
        ...IdxMutation,
        ...UserMutation
    },
    Subscription: {
        ...IdxSubscription
    }
};

export default rootResolver;