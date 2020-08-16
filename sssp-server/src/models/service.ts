/**
 * Model for Index
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
import mongoose, { Schema, Document } from "mongoose";
import splunk from '../config/splunk';

export enum AppType {
    XA,
    UI
}

export interface AppInterface extends Document {
    name: string;
    type: AppType
    url: string;
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
    apps: [AppInterface];
    read: [string];
    write: [string];
}

const IndexSchema: Schema = new Schema({
    name: { type: String, required: true},
    maxTotalDataSizeMB: { type: Number, default: splunk.maxTotalDataSizeMB},
    frozenTimePeriodInSecs: { type: Number, default: splunk.frozenTimePeriodInSecs}
});

const AppSchema: Schema = new Schema({
    name: { type: String, required: true},
    type: { type: AppType, default: AppType.XA},
    urls: { type: String, required: true}
});

const ServiceSchema: Schema = new Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    state: { type: String, required: true },
    indexes: { type: [IndexSchema], default: [] },
    apps: { type: [AppSchema], default: []},
    read: { type: [String], default:[] },
    write: { type: [String], required: true }
});

const Service = mongoose.model<ServiceInterface>('Service', ServiceSchema);
export default Service;
