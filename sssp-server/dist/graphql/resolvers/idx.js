"use strict";
/**
 * File containing all index queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_1 = require("apollo-server");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const idx_1 = tslib_1.__importDefault(require("../../models/idx"));
const merge_1 = require("./merge");
const pubSub = new apollo_server_1.PubSub();
const IDX_ADDED = 'IDX_ADDED';
/**
 * Idx Queries
 * indexes: [Idx!]!
 index(idxId: ID!): Index!
 }
 type Mutation {
    createIndex(createIndex: CreateIndex): Index!
  }
 type Subscription {
    idxAdded: Idx
 */
const IdxQueries = {
    indexes: (parent, args, context) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // If not authenticated throw error
        if (!context.isAuth) {
            throw new Error('Non Authenticated');
        }
        try {
            const users = yield idx_1.default.find();
            return users.map((user) => {
                return merge_1.transformIdx(user);
            });
        }
        catch (err) {
            throw err;
        }
    }),
    index: (parent, { idxId }, context) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        // If not authenticated throw error
        if (!context.isAuth) {
            throw new Error('Non Authenticated');
        }
        try {
            const user = yield idx_1.default.findById(idxId);
            return merge_1.transformIdx(user);
        }
        catch (err) {
            throw err;
        }
    })
};
exports.IdxQueries = IdxQueries;
/**
 * Idx Mutations
 */
const IdxMutation = {
    createIndex: (parent, { idxInput }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const idx = yield idx_1.default.findOne({
                name: idxInput.name
            });
            if (idx) {
                throw new Error('User already Exists');
            }
            else {
                const newIdx = new idx_1.default({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    service: idxInput.service,
                    frozenTimePeriodInSecs: idxInput.frozenTimePeriodInSecs,
                    maxTotalDataSizeMB: idxInput.maxTotalDataSizeMB
                });
                const savedIdx = yield newIdx.save();
                yield pubSub.publish(IDX_ADDED, {
                    idxAdded: merge_1.transformIdx(savedIdx)
                });
                return {
                    savedIdx: savedIdx.id
                };
            }
        }
        catch (error) {
            throw error;
        }
    })
};
exports.IdxMutation = IdxMutation;
/**
 * Idx Subscriptions
 */
const IdxSubscription = {
    idxAdded: {
        subscribe: () => pubSub.asyncIterator([IDX_ADDED])
    }
};
exports.IdxSubscription = IdxSubscription;
//# sourceMappingURL=idx.js.map