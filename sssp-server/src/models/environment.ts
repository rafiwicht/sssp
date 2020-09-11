/**
 * Model for the environemnts
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose, { Schema, Document } from "mongoose";

export interface EnvironmentInterface extends Document {
    _id: string;
    userAccess: boolean;
}

const EnvironmentSchema: Schema = new Schema({
    _id: { type: String, required: true },
    userAccess: { type: Boolean, default: false }
});

const Environment = mongoose.model<EnvironmentInterface>('Environment', EnvironmentSchema);

export default Environment;