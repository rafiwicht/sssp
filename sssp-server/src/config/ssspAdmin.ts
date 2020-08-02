import Admin from "../models/admin";
import mongoose from 'mongoose';

export default (userIds: string) => {
    const users: string[] = userIds.split(',')
    users.forEach((id) => {
        Admin.findOne({
            userId: id
        }).then((doc) => {
            if(!doc) {
                const newAdmin = new Admin({
                    _id: new mongoose.Types.ObjectId(),
                    userId: id
                });
                newAdmin.save().then(() => {
                    console.log(`User ${id} is now an admin.`);
                });
            }
            else {
                console.log(`User ${id} was already an admin.`);
            }
        });
    });
}