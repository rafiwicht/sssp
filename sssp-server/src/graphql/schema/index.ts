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
<<<<<<< HEAD
        sourcetype(serviceId: ID! sourcetypeId: ID!): Sourcetype!
=======
        #sourcetype(serviceId: ID! sourcetypeId: ID!): Sourcetype!
>>>>>>> 691908691b62dd20b0f4ac632379596dc327faa9
    }
    type Mutation {
        createService(serviceInput: ServiceInput!): Service!
        updateService(serviceId: ID!, serviceInput: ServiceInput!): Service!
        deleteService(serviceId: ID!): Service!
        createAdmin(userId: String!): String!
        deleteAdmin(userId: String!): String!
        #updateSourcetype(serviceId: ID!, sourcetypeId: ID!, sourcetypeInput: SourcetypeInput!): Sourcetype!
    }
    type Service {
        _id: ID!
        name: String!
        owner: String!
        state: String!
        read: [String!]!
        write: [String!]!
        indexes: [Index!]!
        apps: [App!]!
    }
    type Index {
        _id: ID!
        name: String!
        maxTotalDataSizeMB: Int!
        frozenTimePeriodInSecs: Int!
    }
    #type Sourcetype {
    #    _id: ID!
    #    name: String!
    #    fields: [KeyValue!]!
    #}
    enum AppType {
        XA
        UI
    }
    type App {
        _id: ID!
        name: String!
        type: AppType!
        url: String!
    }
    type KeyValue {
        _id: ID!
        key: String!
        value: String!
    }
    input ServiceInput {
        name: String!
        owner: String!
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
    }
    input KeyValueInput {
        key: String!
        value: String
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