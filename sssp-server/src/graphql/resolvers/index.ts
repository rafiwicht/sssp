/**
 * Exporting all resolvers
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import { EnvironmentMutations, EnvironmentQueries } from './environment';
import { ServiceMutations, ServiceQueries } from './service';
import {AppMutations, AppQueries} from "./app";
import {HttpMutations, HttpQueries} from "./http";
import {IndexMutations, IndexQueries} from "./idx";
import {ServerMutations, ServerQueries} from "./server";
import {SyslogMutations, SyslogQueries} from "./syslog";


const rootResolver = {
    Query: {
        ...AppQueries,
        ...EnvironmentQueries,
        ...HttpQueries,
        ...IndexQueries,
        ...ServerQueries,
        ...ServiceQueries,
        ...SyslogQueries,
    },
    Mutation: {
        ...AppMutations,
        ...EnvironmentMutations,
        ...HttpMutations,
        ...IndexMutations,
        ...ServerMutations,
        ...ServiceMutations,
        ...SyslogMutations,
    },
};

export default rootResolver;