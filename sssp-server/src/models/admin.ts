/**
 * Model for Index
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
import mongoose, { Schema, Document } from "mongoose";

export interface IndexInterface extends Document {
    name: string;
    maxTotalDataSizeMB: number;
    frozenTimePeriodInSecs: number;
}

export interface ServiceInterface extends Document {
    name: string;
    owner: string;
    state: string;
    indexes: [IndexInterface];
    read: [string];
    write: [string];
}

const IndexSchema: Schema = new Schema({
    name: { type: String, required: true},
    maxTotalDataSizeMB: { type: Number, required: true},
    frozenTimePeriodInSecs: { type: Number, required: true}
});

const ServiceSchema: Schema = new Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    state: { type: String, required: true },
    indexes: { type: [IndexSchema], required: true },
    read: { type: [String], required: true },
    write: { type: [String], required: true }
});

const Service = mongoose.model<ServiceInterface>('Service', ServiceSchema);
export default Service;
