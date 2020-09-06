import mongoose, { Schema, Document } from "mongoose";

export interface HttpInterface extends Document {
    _id: string;
    serviceId: string;
    token: string;
    environmentIds: [string];
    changes?: {
        token: string;
        environmentIds: [string];
    }
}

const HttpSchema: Schema = new Schema({
    _id: { type: String, required: true },
    serviceId: { type: String, required: true },
    token: { type: String, required: true },
    environmentIds : {type: [String], default: []},
    changes: {
        type: {
            token: { type: String, required: true },
            environmentIds : { type: [String], default: [] }
        }
    }
});


const Http = mongoose.model<HttpInterface>('Http', HttpSchema);

export default Http;