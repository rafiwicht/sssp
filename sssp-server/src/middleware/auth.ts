/**
 * Authentication provider
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import * as jwt from 'jsonwebtoken';
import Admin from "../models/admin";
import keycloakValidate from '../config/keycloak'

/**
 * Jwt verifying middleware
 * @param req
 * @param res
 * @param next
 */

export default async (req: any, res: any, next: any) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status = 401;
        return next(new Error('Unauthorized!'));
    }
    const token = authHeader.split(' ')[1];

    if (!token || token === '') {
        res.status = 401;
        return next(new Error('Unauthorized!'));
    }
    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, keycloakValidate.publicFile(), { algorithms: ['RS256']});
    } catch (err) {
        res.status = 401;
        return next(new Error('Unauthorized!'));
    }
    if (!decodedToken) {
        res.status = 401;
        return next(new Error('Unauthorized!'));
    }
    req.userId = decodedToken.preferred_username;

    const admin = await Admin.findOne({
        userId: req.userId
    });
    req.admin = !!admin;

    return next();
};