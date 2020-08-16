import {AppType} from "../models/service";


export default interface GitConnectorInterface {
    create(name: string, read: Array<string>, write: Array<string>, type: AppType);
    delete(name: string);
}