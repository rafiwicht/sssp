/**
 * File containing all service queries, mutations and subscriptions
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose from 'mongoose';
import Service from '../../models/service';
import Admin from "../../models/admin";

const AdminQueries = {
    admin: async (parent: any, {userId}: any) => {
        const admin = await Admin.findById(userId);
        return !!admin;
    }
};

const AdminMutation = {
    createAdmin: async (parent: any, {userId}: any, context: any) => {
        const service = await Service.findById(userId);
        if (service) {
            throw new Error('User already admin');
        } else {
            const newAdmin = new Admin({
                _id: new mongoose.Types.ObjectId(),
                userId: userId
            });
            const savedAdmin = await newAdmin.save();

            return savedAdmin._id;
        }
    },
    deleteAdmin: async (parent: any, {userId}: any, context: any) => {
        const admin = await Service.findByIdAndUpdate(userId);
        return admin._id;
    }
};

export {AdminQueries, AdminMutation};