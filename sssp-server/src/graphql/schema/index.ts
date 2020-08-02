/**
 * Primary file for GraphQL Schema
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {gql} from 'apollo-server-express';
import {ApolloServerExpressConfig} from 'apollo-server-express';
import resolvers from '../resolvers';

const typeDefs = gql`
    type Query {
        services: [Service!]!
        service(serviceId: ID!): Service!
        admins: [String!]!
        admin(userId: String!): Boolean!
    }
    type Mutation {
        createService(serviceInput: ServiceInput!): Service!
        updateService(serviceId: ID!, serviceInput: ServiceInput!): Service!
        deleteService(serviceId: ID!): Service!
        createAdmin(userId: String!): String!
        deleteAdmin(userId: String!): String!
    }
    type Service {
        _id: ID!
        name: String!
        owner: String!
        state: String!
        read: [String!]!
        write: [String!]!
        indexes: [Index!]!
    }
    type Index {
        _id: ID!
        name: String!
        maxTotalDataSizeMB: Int!
        frozenTimePeriodInSecs: Int!
    }
    input ServiceInput {
        name: String!
        owner: String!
        read: [String]
        write: [String]
        indexes: [IndexInput]
    }
    input IndexInput {
        name: String!
        maxTotalDataSizeMB: Int
        frozenTimePeriodInSecs: Int
    }

`;

const schema: ApolloServerExpressConfig = {
    typeDefs,
    resolvers,
    introspection: true,
    context: ({req}: any) => {
        return {
            userId: req.userId,
            admin: req.admin
        };
    },
    playground: true
};

export default schema;