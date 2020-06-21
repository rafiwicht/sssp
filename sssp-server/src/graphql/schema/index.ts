/**
 * Primary file for GraphQL Schema
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import { gql } from 'apollo-server-express';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import resolvers from '../resolvers';

const typeDefs = gql`
  type Query {
    indexes: [Idx!]!
    index(idxId: ID!): Idx!
    login(name: String!, password: String!): AuthData!
  }
  type Mutation {
    createIndex(idxInput: IdxInput): Idx!
    createUser(userInput: UserInput): AuthData!
  }
  type Subscription {
    idxAdded: Idx
  }
  type Idx {
    _id: ID!
    name: String!
    service: String!
    frozenTimePeriodInSecs: Int!
    maxTotalDataSizeMB: Int!
  }
  input IdxInput {
    name: String!
    service: String!
    frozenTimePeriodInSecs: Int!
    maxTotalDataSizeMB: Int!
  }
  type User {
    _id: ID!
    name: String!
    password: String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  input UserInput {
    name: String!
    password: String!
  }
`;

const schema: ApolloServerExpressConfig = {
    typeDefs,
    resolvers,
    introspection: true,
    context: async ({ req, connection, payload }: any) => {
        if (connection) {
            return { isAuth: payload.authToken };
        }
        return { isAuth: req.isAuth };
    },
    playground: true
};

export default schema;