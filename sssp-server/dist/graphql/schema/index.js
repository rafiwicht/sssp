"use strict";
/**
 * Primary file for GraphQL Schema
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = tslib_1.__importDefault(require("../resolvers"));
const typeDefs = apollo_server_express_1.gql `
  type Query {
    indexes: [Idx!]!
    index(idxId: ID!): Idx!
  }
  type Mutation {
    createIndex(idxInput: IdxInput): Idx!
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
`;
const schema = {
    typeDefs,
    resolvers: resolvers_1.default,
    introspection: true,
    context: ({ req, connection, payload }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        if (connection) {
            return { isAuth: payload.authToken };
        }
        return { isAuth: req.isAuth };
    }),
    playground: true
};
exports.default = schema;
//# sourceMappingURL=service.js.map