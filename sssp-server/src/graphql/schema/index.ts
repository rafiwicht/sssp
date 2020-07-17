/**
 * Primary file for GraphQL Schema
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import { gql } from 'apollo-server-express';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import resolvers from '../resolvers';

const typeDefs = gql`
  type Query {
      services: [Service!]!
      service(serviceId: ID!): Service!
  }
  type Mutation {
      createService(serviceInput: ServiceInput!): Service!
      updateService(serviceId: ID!, serviceInput: ServiceInput!): Service!
      deleteService(serviceId: ID!): Service!
  }
  type Service {
      _id: ID!
      name: String!
      owner: String!
      state: String!
  }
  input ServiceInput {
      name: String!
      owner: String!
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