/**
 * Database connection to mongodb
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import Promise from 'bluebird';
import mongoose from "mongoose";

export default (db: string) => {
    Promise.promisifyAll(mongoose);
    mongoose.set('useFindAndModify', false);

    const connect = () => {
        mongoose
            .connect(db, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                return console.log(`Successfully connected to ${db}`);
            })
            .catch(error => {
                console.log("Error connecting to database: ", error);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on("disconnected", connect);
};