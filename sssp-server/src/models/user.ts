/**
 * Model for Index
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
    name: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;