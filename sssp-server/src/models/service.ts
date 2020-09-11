/**
 * Model for the services
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
import mongoose, { Schema, Document } from "mongoose";
import { State } from './index';

export interface ServiceInterface extends Document {
    _id: string;
    owner: string;
    description: string;
    dataClassification: string;
    state: State;
    changes?: {
        owner: string;
        description: string;
        dataClassification: string;
    }
}

const ServiceSchema: Schema = new Schema({
    _id: { type: String, required: true },
    owner: { type: String, required: true },
    description: { type: String, required: true },
    dataClassification: { type: String, required: true },
    state: { type: State, default: State.IN_CREATION },
    changes: {
        type: {
            owner: { type: String, required: true },
            description: { type: String, required: true },
            dataClassification: { type: String, required: true },
        }
    }
});

const Service = mongoose.model<ServiceInterface>('Service', ServiceSchema);
export default Service;