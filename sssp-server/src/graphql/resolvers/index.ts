/**
 * Exporting all resolvers
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import { EnvironmentMutations, EnvironmentQueries } from './environment';
import { ServiceMutations, ServiceQueries } from './service';


const rootResolver = {
    Query: {
        ...ServiceQueries,
        ...EnvironmentQueries
    },
    Mutation: {
        ...ServiceMutations,
        ...EnvironmentMutations
    },
};

export default rootResolver;