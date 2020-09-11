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

// Regex for service permission extraction
let re = new RegExp(`^${config.prefixLDAPGroups}([a-z]*)_power`)

export default async (req: any, res: any, next: any) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return next();
    }
    const token = authHeader.split(' ')[1];

    // Static token for development
    if(config.devToken && token === config.devToken) {
        req.userId = 'test1'
        req.admin = true;
        return next();
    }

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

    // Set username and admin previliges
    req.userId = decodedToken.preferred_username;
    req.admin = decodedToken.realm_access.roles.includes(config.adminRole);

    // Extract service permission from roles
    req.readAccess = []
    req.writeAccess = []
    decodedToken.realm_access.roles.forEach((e: string) => {
        const res = e.match(re);
        if(res) {
            req.read.push(res[1]);
            if(res[2] === 'power') {
                req.write.push(res[1]);
            }
        }
    });
    console.log(req);
    return next();
};