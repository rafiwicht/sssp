/**
 * GraphQL Schema for SSSP
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {gql} from 'apollo-server-express';
import {ApolloServerExpressConfig} from 'apollo-server-express';
import resolvers from '../resolvers';
import {AuthenticationError} from 'apollo-server';

const typeDefs = gql`
    enum Kind {
        CURRENT
        FUTURE
        NEWEST
    }
    type Query {
        services(kind: Kind = CURRENT): [Service!]!
        service(serviceId: ID!, kind: Kind = CURRENT): Service!
        workflow(serviceId: ID!): Workflow!
    }
    type Mutation {
        createService(serviceInput: ServiceInput!): Service!
        updateService(serviceId: ID!, serviceInput: ServiceInput!): Service!
        deleteService(serviceId: ID!): Service!
        acceptWorkflow(serviceId: ID!): Service!
        declineWorkflow(serviceId: ID!): Service!
    }
    enum State {
        IN_CREATION
        ACTIVE
        IN_DELETION
        IN_MODIFICATION
    }
    type Workflow {
        _id: ID!
        name: [String!]!
        owner: [String!]!
        description: [String!]!
        dataClassification: [String!]!
        read: [[String!]!]!
        write: [[String!]!]!
        indexes: [[Index!]!]!
        apps: [[App!]!]!
        state: State!
    }
    type Service {
        _id: ID!
        name: String!
        owner: String!
        description: String!
        dataClassification: String!
        read: [String!]!
        write: [String!]!
        indexes: [Index!]!
        apps: [App!]!
        state: State!
    }
    type Index {
        name: String!
        maxTotalDataSizeMB: Int!
        frozenTimePeriodInSecs: Int!
    }
    enum AppType {
        FA
        TA
        SA
        IA
        UI
    }
    type App {
        name: String!
        type: AppType!
        url: String!
        version: String!
    }
    input ServiceInput {
        name: String!
        owner: String!
        description: String!
        dataClassification: String!
        read: [String!]
        write: [String!]!
        indexes: [IndexInput!]
        apps: [AppInput!]
    }
    input IndexInput {
        name: String!
        maxTotalDataSizeMB: Int
        frozenTimePeriodInSecs: Int
    }
    input AppInput {
        name: String!
        type: AppType!
        version: String!
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
            admin: req.admin
        };
    },
    playground: true
};

export default schema;