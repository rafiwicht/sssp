"use strict";
/**
 * Transform functions for the types
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
const transformIdx = idx => {
    return Object.assign(Object.assign({}, idx._doc), { _id: idx.id });
};
exports.transformIdx = transformIdx;
//# sourceMappingURL=merge.js.map