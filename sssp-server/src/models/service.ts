/**
 * Model for Index
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
import mongoose, { Schema, Document } from "mongoose";

export interface ExtractionInterface extends Document {
    name: string;
    value: string;
}

export interface SourcetypeInterface extends Document {
    name: string;
    breakOnlyBeforeDate: string;
    eventBreaker: string;
    eventBreakerEnable: boolean;
    lineBreaker: string;
    maxTimestampLookahead: number;
    shouldLineMerge: boolean;
    timeFormat: string;
    truncate: number;
    extractions: [ExtractionInterface]
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
    maxTotalDataSizeMB: { type: Number, required: true},
    frozenTimePeriodInSecs: { type: Number, required: true}
});

const ExtractionSchema: Schema = new Schema({
    name: { type: String, required: true },
    value: { type: String, required: true }
})

const SourcetypeSchema: Schema = new Schema({
    name: { type: String, required: true},
    breakOnlyBeforeDate: { type: String, required: true},
    eventBreaker: { type: String, required: true},
    eventBreakerEnable: { type: Boolean, required: true},
    lineBreaker: { type: String, required: true},
    maxTimestampLookahead: { type: Number, required: true},
    shouldLineMerge: { type: Boolean, required: true},
    timeFormat: { type: String, required: true},
    truncate: { type: Number, required: true},
    extractions: { type: [ExtractionSchema], required: true}
});

const ServiceSchema: Schema = new Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    state: { type: String, required: true },
    indexes: { type: [IndexSchema], required: true },
    sourcetypes: { type: [SourcetypeSchema], required: true},
    read: { type: [String], required: true },
    write: { type: [String], required: true }
});

const Service = mongoose.model<ServiceInterface>('Service', ServiceSchema);
export default Service;
