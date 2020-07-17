/**
 * Authentication provider
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

//import * as jwt from 'jsonwebtoken';
//import config from "../config";
//import {exec} from "child_process";
//import * as fs from "fs";
//
///**
// * Download cert
// */
//exec('wget '+ config.jwtCertUrl +' -O ' + config.jwtFileName);
//const data: any = fs.readFileSync(config.jwtFileName);
//const publicKey = JSON.parse(data).keys[0].x5c[0];

/**
 * Jwt verifying middleware
 * @param req
 * @param res
 * @param next
 */

export default (req: any, res: any, next: any) => {
    //const authHeader = req.get('Authorization');
    //if (!authHeader) {
    //    req.isAuth = false;
    //    return next();
    //}
    //const token = authHeader.split(' ')[1];
    //if (!token || token === '') {
    //    req.isAuth = false;
    //    return next();
    //}
    //let decodedToken: any;
    //try {
    //    decodedToken = jwt.verify(token, publicKey);
    //    console.log(decodedToken);
    //} catch (err) {
    //    req.isAuth = false;
    //    return next();
    //}
    //if (!decodedToken) {
    //    req.isAuth = false;
    //    return next();
    //}
    //req.isAuth = true;
    //req.userId = decodedToken.userId;
    //console.log(decodedToken.userId)
    req.isAuth = true;
    req.userId = "test2";
    return next();
};