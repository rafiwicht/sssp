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
    IN_DELETION = 'IN_DELETION',
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

export interface ServiceInterface extends Document {
    name: string;
    owner: string;
    description: string;
    dataClassification: string;
    revision: number;
    indexes: [IndexInterface];
    apps: [AppInterface];
    read: [string];
    write: [string];
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
    url: { type: String, default: 'in creation'}
});

const ServiceSchema: Schema = new Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    description: { type: String, required: true },
    dataClassification: { type: String, required: true },
    revision: { type: Number, default: 1},
    indexes: { type: [IndexSchema], default: [] },
    apps: { type: [AppSchema], default: []},
    read: { type: [String], default:[] },
    write: { type: [String], default: [] },
    state: { type: State, default: State.IN_CREATION }
});

const Service = mongoose.model<ServiceInterface>('Service', ServiceSchema);
const FutureService = mongoose.model<ServiceInterface>('FutureService', ServiceSchema);
const RevisionService = mongoose.model<ServiceInterface>('RevisionService', ServiceSchema);
export {Service, FutureService, RevisionService};