/**
 * Model for the services
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
import mongoose, { Schema, Document } from "mongoose";

export interface ServiceInterface extends Document {
    _id: string;
    owner: string;
    description: string;
    dataClassification: string;
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