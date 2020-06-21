/**
 * File containing all user queries and mutations
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import mongoose from 'mongoose';
import User from '../../models/user';
import config from '../../config';
import jwt from 'jsonwebtoken';

/**
 * Idx Queries
 */
const UserQueries = {
    login: async (parent, {name, password}) => {
        try {
            const user: any = await User.findOne({name, password});
            if (!user) {
                throw new Error('User does not Exists');
            }
            const token = jwt.sign({userId: user.id}, config.jwtSecret, {
                expiresIn: '1h'
            });
            return {
                userId: user.id,
                token,
                tokenExpiration: 1
            };
        } catch (err) {
            throw err;
        }
    }
};

/**
 * Idx Mutations
 */
const UserMutation = {
    createUser: async (parent: any, {userInput}: any) => {
        try {
            const idx = await User.findOne({
                name: userInput.name
            });
            if(idx) {
                throw new Error('User already Exists');
            } else {
                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: userInput.name,
                    password: userInput.password
                });
                const savedUser = await newUser.save();
                const token = jwt.sign({ userId: savedUser.id }, config.jwtSecret, {
                    expiresIn: '1h'
                });
                return {
                    userId: savedUser.id,
                    token,
                    tokenExpiration: 1
                };
            }
        } catch (error) {
            throw error;
        }
    }
};

export {UserQueries, UserMutation};