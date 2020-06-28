/**
 * Model fpor Index
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
import mongoose, { Schema, Document } from "mongoose";

export interface IdxInterface extends Document {
    name: string;
    service: string;
    frozenTimePeriodInSecs: number;
    maxTotalDataSizeMB: number;
}

const IdxSchema: Schema = new Schema({
    name: { type: String, required: true },
    service: { type: String, required: true },
    frozenTimePeriodInSecs: { type: Number, required: true },
    maxTotalDataSizeMB: { type: Number, required: true }
});

const Idx = mongoose.model<IdxInterface>("Idx", IdxSchema);
export default Idx;
