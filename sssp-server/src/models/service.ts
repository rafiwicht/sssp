/**
 * Model for Index
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
import mongoose, { Schema, Document } from "mongoose";
import splunk from '../config/splunk';

export enum AppType {
    FA = 'FA',
    TA = 'TA',
    SA = 'SA',
    IA = 'IA',
    UI = 'UI'
}

export enum State {
    IN_CREATION= 'IN_CREATION',
    ACTIVE = 'ACTIVE',
    IN_DELETION = 'IN_CREATION',
    IN_MODIFICATION = 'IN_MODIFICATION'
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

export interface BaseServiceInterface extends Document {
    name: string;
    owner: string;
    description: string;
    dataClassification: string;
    revision: number;
    indexes: [IndexInterface];
    apps: [AppInterface];
    read: [string];
    write: [string];
}

export interface ServiceInterface extends BaseServiceInterface {
    futureService: BaseServiceInterface;
    state: State;
}

const IndexSchema: Schema = new Schema({
    name: { type: String, required: true},
    maxTotalDataSizeMB: { type: Number, default: splunk.maxTotalDataSizeMB},
    frozenTimePeriodInSecs: { type: Number, default: splunk.frozenTimePeriodInSecs}
});

const AppSchema: Schema = new Schema({
    name: { type: String, required: true},
    type: { type: AppType, default: AppType.TA},
    url: { type: String, required: true}
});

const baseService = {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    description: { type: String, required: true },
    dataClassification: { type: String, required: true },
    indexes: { type: [IndexSchema], default: [] },
    apps: { type: [AppSchema], default: []},
    read: { type: [String], default:[] },
    write: { type: [String], default: [] },
    revision: { type: Number, default: 1}
};

const BaseServiceSchema: Schema = new Schema(baseService);


const ServiceSchema: Schema = new Schema({
    ...baseService,
    state: { type: State, default: State.IN_CREATION },
    futureService: { type: BaseServiceSchema, default: null}
});

const Service = mongoose.model<ServiceInterface>('Service', ServiceSchema);
const RevisionService = mongoose.model<BaseServiceInterface>('RevisionService', BaseServiceSchema);
export {Service, RevisionService};