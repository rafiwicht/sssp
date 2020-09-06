import mongoose, { Schema, Document } from "mongoose";

export interface ServerInterface extends Document {
    _id: string;
    serviceId: string;
    hosts: [string];
    appIds: [string];
    environmentIds: [string];
    changes?: {
        hosts: [string];
        appIds: [string];
        environmentIds: [string];
    }
}

const ServerSchema: Schema = new Schema({
    _id: { type: String, required: true },
    serviceId: { type: String, required: true },
    hosts: { type: [String], default: [] },
    appIds: { type: [String], default: [] },
    environmentIds : {type: [String], default: []},
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