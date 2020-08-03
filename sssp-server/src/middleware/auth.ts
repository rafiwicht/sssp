/**
 * Authentication provider
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import * as jwt from 'jsonwebtoken';
import config from "../config";
import {exec} from "child_process";
import * as fs from "fs";
import Admin from "../models/admin";

/**
 * Download cert
 */
exec('wget '+ config.jwtCertUrl +' -O ' + config.jwtFileName);
const data: string = fs.readFileSync(config.jwtFileName).toString();
console.log(data);
const publicKey = JSON.parse(data).keys[0].x5c[0];
const publicFile = `-----BEGIN CERTIFICATE-----
${publicKey}
-----END CERTIFICATE----- 
`

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
        decodedToken = jwt.verify(token, publicFile, { algorithms: ['RS256']});
    } catch (err) {
        res.status = 401;
        console.log(err);
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
    console.log(req.admin);
    console.log(admin);

    return next();
};