/**
 * File containing Express Configuration
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import * as http from 'http';
import schema from '../graphql/schema/index';
import auth from '../middleware/auth';
import config from './index';

class Express {
    public express: express.Application;
    public server: ApolloServer = new ApolloServer(schema);
    public httpServer: http.Server;
    public init = (): void => {
        /**
         * Creating an express application
         */
        this.express = express();
        /**
         * Middleware for using CORS
         */
        this.express.use(cors({
            origin(origin, callback) {
                /**
                 * Allow requests with no origin
                 * Like mobile apps or curl requests
                 */
                //if (!origin) { return callback(null, true); }
                //if (config.allowedOrigins.indexOf(origin) === -1) {
                //    const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
                //    return callback(new Error(msg), false);
                //}
                return callback(null, true);
            }
        }));
        /**
         *  Middleware for extracting authToken
         */
        this.express.use(auth);
        this.server.applyMiddleware({ app: this.express, path: config.path });
        this.httpServer = http.createServer(this.express);
        /**
         * Installing subscription handlers
         */
        this.server.installSubscriptionHandlers(this.httpServer);
    }
}

export default Express;