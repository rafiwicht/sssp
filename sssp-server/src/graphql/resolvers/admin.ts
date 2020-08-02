/**
 * File containing all service queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose from 'mongoose';
import Admin from "../../models/admin";

const AdminQueries = {
    admins: async (parent: any, {}, context: any) => {
        console.log(context);
        if(!context.admin) {
            throw new Error('Unauthorized!')
        }
        const admins = await Admin.find();
        return admins.map((admin) => {
            return admin.userId;
        });
    },
    admin: async (parent: any, {userId}: any) => {
        const admin = await Admin.findOne({
            userId: userId
        });
        return !!admin;
    }
};

const AdminMutation = {
    createAdmin: async (parent: any, {userId}: any, context: any) => {
        if(!context.admin) {
            throw new Error('Unauthorized!')
        }
        const admin = await Admin.findOne({
            userId: userId
        });
        if (admin) {
            throw new Error('User is already admin');
        } else {
            const newAdmin = new Admin({
                _id: new mongoose.Types.ObjectId(),
                userId: userId
            });
            const savedAdmin = await newAdmin.save();

            return savedAdmin.userId;
        }
    },
    deleteAdmin: async (parent: any, {userId}: any, context: any) => {
        if(!context.admin) {
            throw new Error('Unauthorized!')
        }
        const admin = await Admin.findOneAndDelete({
            userId: userId
        });
        return admin.userId;
    }
};

export {AdminQueries, AdminMutation};