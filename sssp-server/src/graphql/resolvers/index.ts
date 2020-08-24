/**
 * Exporting all resolvers
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {ServiceQueries, ServiceMutations} from './service';
import {WorkflowMutations, WorkflowQueries} from "./workflow";

const rootResolver = {
    Query: {
        ...ServiceQueries,
        ...WorkflowQueries,
    },
    Mutation: {
        ...ServiceMutations,
        ...WorkflowMutations,
    },
};

export default rootResolver;