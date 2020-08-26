/**
 * Interface for git connectors
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */


import {AppType} from "../models/service";


export default interface GitConnectorInterface {
    createRepo(name: string, read: Array<string>, write: Array<string>, type: AppType): string;
    deleteRepo(name: string);
}
