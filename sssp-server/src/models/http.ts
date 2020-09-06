import mongoose, { Schema, Document } from "mongoose";
import { State } from './index';

export interface HttpInterface extends Document {
    _id: string;
    serviceId: string;
    token: string;
    environmentIds: [string];
    state: State;
    changes?: {
        token: string;
        environmentIds: [string];
    }
}

const HttpSchema: Schema = new Schema({
    _id: { type: String, required: true },
    serviceId: { type: String, required: true, index: true },
    token: { type: String, required: true },
    environmentIds : {type: [String], default: []},
    state: { type: State, default: State.IN_CREATION },
    changes: {
        type: {
            token: { type: String, required: true },
            environmentIds : { type: [String], default: [] }
        }
    }
});


const Http = mongoose.model<HttpInterface>('Http', HttpSchema);

export default Http;