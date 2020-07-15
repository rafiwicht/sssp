"use strict";
/**
 * Exporting all resolvers
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const idx_1 = require("./idx");
const rootResolver = {
    Query: Object.assign({}, idx_1.IdxQueries),
    Mutation: Object.assign({}, idx_1.IdxMutation),
    Subscription: Object.assign({}, idx_1.IdxSubscription)
};
exports.default = rootResolver;
//# sourceMappingURL=service.js.map