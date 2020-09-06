import mongoose, { Schema, Document } from "mongoose";
import { State } from './index';

export interface ServerInterface extends Document {
    _id: string;
    serviceId: string;
    hosts: [string];
    appIds: [string];
    environmentIds: [string];
    state: State;
    changes?: {
        hosts: [string];
        appIds: [string];
        environmentIds: [string];
    }
}

const ServerSchema: Schema = new Schema({
    _id: { type: String, required: true },
    serviceId: { type: String, required: true, index: true },
    hosts: { type: [String], default: [] },
    appIds: { type: [String], default: [] },
    environmentIds : {type: [String], default: []},
    state: { type: State, default: State.IN_CREATION },
    changes: {
        type: {
            hosts: { type: [String], default: [] },
            appIds: { type: [String], default: [] },
            environmentIds : {type: [String], default: []},
        }
    }
});


const Server = mongoose.model<ServerInterface>('Server', ServerSchema);

export default Server;