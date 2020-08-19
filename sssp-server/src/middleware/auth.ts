/**
 * Authentication provider
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import * as jwt from 'jsonwebtoken';
import keycloakValidate from '../config/keycloak';
import config from '../config';

/**
 * Jwt verifying middleware
 * @param req
 * @param res
 * @param next
 */

export default async (req: any, res: any, next: any) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return next();
    }
    const token = authHeader.split(' ')[1];

    if (!token || token === '') {
        return next();
    }
    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, keycloakValidate.publicFile(), { algorithms: ['RS256']});
    } catch (err) {
        return next();
    }
    if (!decodedToken) {
        return next();
    }
    req.userId = decodedToken.preferred_username;
    req.admin = decodedToken.realm_access.roles.includes(config.adminRole);
    return next();
};