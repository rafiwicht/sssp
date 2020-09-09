/**
 * GraphQL Schema for SSSP
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {gql} from 'apollo-server-express';
import {ApolloServerExpressConfig} from 'apollo-server-express';
import resolvers from '../resolvers';
import {AuthenticationError} from 'apollo-server';

const typeDefs = gql`
    type Query {

        ##### App #####
        apps(serviceId: String): [App!]!
        app(appId: String!): App!
        
        ##### Environment #####
        environments: [Environment!]!
        
        ##### Http #####
        https(serviceId: String): [Http!]!
        http(httpId: String!): Http!
        
        ##### Index #####
        indexes(serviceId: String): [Index!]!
        index(indexId: String!): Index!
        
        ##### Server #####
        servers(serviceId: String): [Server!]!
        server(serverId: String!): Server!
        
        ##### Service #####
        services: [Service!]!
        service(serviceId: String!): Service!
        
        ##### Syslog #####
        syslogs(serviceId: String): [Syslog!]!
        syslog(syslogId: String!): Syslog!
    }
    type Mutation {

        ##### App #####
        putApp(appId: String!, appInput: AppInput!): App!
        deleteApp(appId: String!): App!
        acceptAppChange(appId: String!): App!
        rejectAppChange(appId: String!): App!

        ##### Environment #####
        putEnvironment(environmentId: String!, environmentInput: EnvironmentInput!): Environment!
        deleteEnvironment(environmentId: String!): Environment!
        
        ##### Http #####
        putHttp(httpId: String!, httpInput: HttpInput!): Http!
        deleteHttp(httpId: String!): Http!
        acceptHttpChange(httpId: String!): Http!
        rejectHttpChange(httpId: String!): Http!
        
        ##### Index #####
        putIndex(indexId: String!, indexInput: IndexInput!): Index!
        deleteIndex(indexId: String!): Index!
        acceptIndexChange(indexId: String!): Index!
        rejectIndexChange(indexId: String!): Index!
        
        ##### Server #####
        putServer(serverId: String!, serverInput: ServerInput!): Server!
        deleteServer(serverId: String!): Server!
        acceptServerChange(serverId: String!): Server!
        rejectServerChange(serverId: String!): Server!

        ##### Service #####
        putService(serviceId: String!, serviceInput: ServiceInput!): Service!
        deleteService(serviceId: String!): Service!
        acceptServiceChange(serviceId: String!): Service!
        rejectServiceChange(serviceId: String!): Service!
        
        ##### Syslog #####
        putSyslog(syslogId: String!, syslogInput: SyslogInput!): Syslog!
        deleteSyslog(syslogId: String!): Syslog!
        acceptSyslogChange(syslogId: String!): Syslog!
        rejectSyslogChange(syslogId: String!): Syslog!
   
    }
    enum State {
        IN_CREATION
        ACTIVE
        IN_DELETION
        IN_MODIFICATION
    }

    ##### App #####
    type AppChanges {
        url: String!
        version: String!
        git: Boolean!
        environmentIds: [String!]!
    }
    type App {
        _id: String!
        serviceId: String!
        url: String!
        version: String!
        git: Boolean!
        environmentIds: [String!]!
        state: State!
        changes: AppChanges
    }
    input AppInput {
        serviceId: String!
        url: String
        version: String
        git: Boolean
        environmentIds: [String!]
    }
    
    ##### Environment #####
    type Environment {
        _id: String!
        userAccess: Boolean!
    }
    input EnvironmentInput {
        userAccess: Boolean
    }
    ##### Http #####
    type HttpChanges {
        token: String!
        environmentIds: [String!]!
    }
    type Http {
        _id: String!
        serviceId: String!
        token: String!
        environmentIds: [String!]!
        state: State!
        changes: HttpChanges
    }
    input HttpInput {
        serviceId: String!
        token: String!
        environmentIds: [String!]
    }

    ##### Index #####
    type IndexChanges {
        maxTotalDataSizeMB: Int!
        frozenTimePeriodInSecs: Int!
        environmentIds: [String!]!
    }
    type Index {
        _id: String!
        serviceId: String!
        maxTotalDataSizeMB: Int!
        frozenTimePeriodInSecs: Int!
        environmentIds: [String!]!
        state: State!
        changes: IndexChanges
    }
    input IndexInput {
        serviceId: String!
        maxTotalDataSizeMB: Int
        frozenTimePeriodInSecs: Int
        environmentIds: [String!]
    }

    ##### Server #####
    type ServerChanges {
        hosts: [String!]!
        appIds: [String!]!
        environmentIds: [String!]!
        
    }
    type Server {
        _id: String!
        serviceId: String!
        hosts: [String!]!
        appIds: [String!]!
        environmentIds: [String!]!
        state: State!
        changes: ServerChanges
    }
    input ServerInput {
        serviceId: String!
        hosts: [String!]
        appIds: [String!]
        environmentIds: [String!]
    }
    
    ##### Service #####
    type ServiceChanges {
        owner: String!
        description: String!
        dataClassification: String!
}
    type Service {
        _id: String!
        owner: String!
        description: String!
        dataClassification: String!
        state: State!
        changes: ServiceChanges
    }
    input ServiceInput {
        owner: String!
        description: String!
        dataClassification: String!
    }
    
    ##### Syslog #####
    enum Protocol {
        TCP
        UDP
    }
    type SyslogChanges {
        index: String!
        sourcetype: String!
        port: Int
        protocol: Protocol
        hosts: [String!]
        environmentIds: [String!]
        
    }
    type Syslog {
        _id: String!
        serviceId: String!
        index: String!
        sourcetype: String!
        port: Int!
        protocol: Protocol!
        hosts: [String!]!
        environmentIds: [String!]!
        state: State!
        changes: SyslogChanges
    }
    input SyslogInput {
        serviceId: String!
        index: String!
        sourcetype: String!
        port: Int
        protocol: Protocol
        hosts: [String!]
        environmentIds: [String!]
    }
    
`;

const schema: ApolloServerExpressConfig = {
    typeDefs,
    resolvers,
    introspection: true,
    context: ({req}: any) => {
        // Add authentication to the graphql context
        if (!req.userId) throw new AuthenticationError('Unauthenticated!');
        return {
            userId: req.userId,
            admin: req.admin,
            services: req.services
        };
    },
    playground: true
};

export default schema;