/**
 * Model fpor Index
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
import mongoose, { Schema, Document } from "mongoose";

export interface ServiceInterface extends Document {
    name: string;
    owner: string;
}

const ServiceSchema: Schema = new Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true }
});

const Service = mongoose.model<ServiceInterface>('Service', ServiceSchema);
export default Service;
