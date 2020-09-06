import mongoose, { Schema, Document } from "mongoose";

export enum Protocol {
    TCP = 'TCP',
    UDP = 'UDP'
}

export interface SyslogInterface extends Document {
    _id: string;
    serviceId: string;
    index: string;
    sourcetype: string;
    port: number;
    protocol: Protocol;
    hosts?: [string];
    environmentIds: [string];
    changes?: {
        index: string;
        sourcetype: string;
        port: number;
        protocol: Protocol;
        hosts?: [string];
        environmentIds: [string];
    }
}


const SyslogSchema: Schema = new Schema({
    _id: { type: String, required: true },
    serviceId: { type: String, required: true },
    index: { type: String, required: true },
    sourcetype: { type: String, required: true },
    port: { type: Number, required: 514 },
    protocol: { type: Protocol, default: Protocol.UDP },
    hosts: { type: [String] },
    environmentIds : {type: [String], default: []},
    changes: {
        type: {
            index: { type: String, required: true },
            sourcetype: { type: String, required: true },
            port: { type: Number, required: 514 },
            protocol: { type: Protocol, default: Protocol.UDP },
            hosts: { type: [String] },
            environmentIds : {type: [String], default: []},
        }
    }
});

const Syslog = mongoose.model<SyslogInterface>('Syslog', SyslogSchema);

export default Syslog;