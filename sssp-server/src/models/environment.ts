import mongoose, { Schema, Document } from "mongoose";


export interface EnvironmentInterface extends Document {
    _id: string;
    userAccess: boolean;
}

const EnvironmentSchema: Schema = new Schema({
    _id: { type: String, required: true, index: true },
    userAccess: { type: Boolean, default: false }
});

// Saving active state
const Environment = mongoose.model<EnvironmentInterface>('Environment', EnvironmentSchema);

export default Environment;