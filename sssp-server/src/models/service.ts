/**
 * Model for the services
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
import mongoose, { Schema, Document } from "mongoose";
import config from '../config';


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
    IN_MODIFICATION = 'IN_MODIFICATION',
    ARCHIVED = 'ARCHIVED'
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

// No id's, because object does not have to be accessible directly
const IndexSchema: Schema = new Schema({
    _id : false,
    name: { type: String, required: true},
    maxTotalDataSizeMB: { type: Number, default: config.maxTotalDataSizeMB},
    frozenTimePeriodInSecs: { type: Number, default: config.frozenTimePeriodInSecs}
});

// No id's, because object does not have to be accessible directly
const AppSchema: Schema = new Schema({
    _id : false,
    name: { type: String, required: true},
    type: { type: AppType, default: AppType.TA },
    url: { type: String, default: 'in creation' },
    version: { type: String, default: 'latest' }
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

// Saving active state
const Service = mongoose.model<ServiceInterface>('Service', ServiceSchema);
// Saving modifications until approval
const FutureService = mongoose.model<ServiceInterface>('FutureService', ServiceSchema);
// Saving revisions for roll backs
const RevisionService = mongoose.model<ServiceInterface>('RevisionService', ServiceSchema);
export {Service, FutureService, RevisionService};