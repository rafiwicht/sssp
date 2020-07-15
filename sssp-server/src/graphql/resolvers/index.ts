/**
 * Exporting all resolvers
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {ServiceQueries, ServiceMutation} from './service';

const rootResolver = {
    Query: {
        ...ServiceQueries,
    },
    Mutation: {
        ...ServiceMutation,
    },
};

export default rootResolver;