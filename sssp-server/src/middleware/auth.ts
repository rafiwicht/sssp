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

    // For development
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
    req.userId = decodedToken.preferred_username;
    req.admin = decodedToken.realm_access.roles.includes(config.adminRole);
    req.services = decodedToken.realm_access.roles
                        .filter((e: string) => e.startsWith(config.prefixLDAPGroups))
                        .map((e: string) => {
                            return e.replace(config.prefixLDAPGroups, '')
                                    .replace('_user', '')
                                    .replace('_power', '');
                        })
                        .filter((value, index, self) => self.index(value) === index);
    return next();
};