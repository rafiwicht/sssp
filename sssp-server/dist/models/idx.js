"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Model fpor Index
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const IdxSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    service: { type: String, required: true },
    frozenTimePeriodInSecs: { type: Number, required: true },
    maxTotalDataSizeMB: { type: Number, required: true }
});
const Idx = mongoose_1.default.model("Idx", IdxSchema);
exports.default = Idx;
//# sourceMappingURL=idx.js.map