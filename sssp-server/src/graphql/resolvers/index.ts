/**
 * Exporting all resolvers
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {ServiceQueries, ServiceMutation} from './service';
import {AdminMutation, AdminQueries} from "./admin";
//import {SourcetypeQueries, SourcetypeMutations} from './sourcetype';

const rootResolver = {
    Query: {
        ...ServiceQueries,
        ...AdminQueries,
        //...SourcetypeQueries,
    },
    Mutation: {
        ...ServiceMutation,
        ...AdminMutation,
        //...SourcetypeMutations,
    },
};

export default rootResolver;