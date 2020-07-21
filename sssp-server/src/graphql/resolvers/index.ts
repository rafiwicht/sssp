/**
 * Exporting all resolvers
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {ServiceQueries, ServiceMutation} from './service';
import {AdminMutation, AdminQueries} from "./admin";

const rootResolver = {
    Query: {
        ...ServiceQueries,
        ...AdminQueries,
    },
    Mutation: {
        ...ServiceMutation,
        ...AdminMutation,
    },
};

export default rootResolver;