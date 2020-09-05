/**
 * Bootstrap sssp
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import connect from './config/connect';
import config from './config';
import Express from './config/express';


/**
 * Connect database
 * @param db: string
 */
connect(config.db);

/**
 * Initialize Express
 */
const ExpressServer = new Express();
ExpressServer.init();

/**
 * Listen to port
 */
ExpressServer.httpServer.listen(config.port, () => {
    console.log(`🚀  Server ready at ${config.port}`);
    console.log(
        `🚀 Server ready at http://localhost:${config.port}${ExpressServer.server.graphqlPath}`
    );
    console.log(
        `🚀 Subscriptions ready at ws://localhost:${config.port}${ExpressServer.server.subscriptionsPath}`
    );
});