/**
 * Model for Index
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
import mongoose, { Schema, Document } from "mongoose";
import splunk from '../config/splunk';

export interface KeyValueInterface extends Document {
    key: string;
    value: string;
}

export interface SourcetypeInterface extends Document {
    name: string;
    fields: [KeyValueInterface];
}

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
    sourcetypes: [SourcetypeInterface];
    read: [string];
    write: [string];
}

const IndexSchema: Schema = new Schema({
    name: { type: String, required: true},
    maxTotalDataSizeMB: { type: Number, default: splunk.maxTotalDataSizeMB},
    frozenTimePeriodInSecs: { type: Number, default: splunk.frozenTimePeriodInSecs}
});

const KeyValueSchema: Schema = new Schema({
    key: { type: String, required: true },
    value: { type: String, default: '' }
})

const SourcetypeSchema: Schema = new Schema({
    name: { type: String, required: true},
    fields: { type: [KeyValueSchema], default: []}
});

const ServiceSchema: Schema = new Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    state: { type: String, required: true },
    indexes: { type: [IndexSchema], default: [] },
    sourcetypes: { type: [SourcetypeSchema], default: []},
    read: { type: [String], default:[] },
    write: { type: [String], required: true }
});

const Service = mongoose.model<ServiceInterface>('Service', ServiceSchema);
export default Service;
