import {AppType} from "../models/service";


export default interface GitConnectorInterface {
    createRepo(name: string, read: Array<string>, write: Array<string>, type: AppType): string;
    deleteRepo(name: string);
}