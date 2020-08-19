/**
 * Exporting all resolvers
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {ServiceQueries, ServiceMutation} from './service';
//import {SourcetypeQueries, SourcetypeMutations} from './sourcetype';

const rootResolver = {
    Query: {
        ...ServiceQueries,
        //...SourcetypeQueries,
    },
    Mutation: {
        ...ServiceMutation,
        //...SourcetypeMutations,
    },
};

export default rootResolver;