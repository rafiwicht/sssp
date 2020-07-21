/**
 * Model for Index
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
import mongoose, { Schema, Document } from "mongoose";

export interface AdminInterface extends Document {
    userId: string;
}

const AdminSchema: Schema = new Schema({
    userId: { type: String, required: true}
});


const Admin = mongoose.model<AdminInterface>('Admin', AdminSchema);
export default Admin;
