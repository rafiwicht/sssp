import mongoose, { Schema, Document } from "mongoose";
import config from '../config';

export interface IndexInterface extends Document {
    _id: string;
    serviceId: string;
    maxTotalDataSizeMB: number;
    frozenTimePeriodInSecs: number;
    environmentIds: [string];
    changes?: {
        maxTotalDataSizeMB: number;
        frozenTimePeriodInSecs: number;
        environmentIds: [string];
    }
}

const IndexSchema: Schema = new Schema({
    _id: { type: String, required: true },
    serviceId: { type: String, required: true },
    maxTotalDataSizeMB: { type: Number, default: config.maxTotalDataSizeMB },
    frozenTimePeriodInSecs: { type: Number, default: config.frozenTimePeriodInSecs },
    environmentIds : {type: [String], default: []},
    changes: {
        type: {
            maxTotalDataSizeMB: { type: Number, default: config.maxTotalDataSizeMB},
            frozenTimePeriodInSecs: { type: Number, default: config.frozenTimePeriodInSecs },
            environmentIds : { type: [String], default: [] }
        }
    }
});


const Index = mongoose.model<IndexInterface>('Index', IndexSchema);

export default Index;