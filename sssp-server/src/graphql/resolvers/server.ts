import Server from "../../models/service";
import {getElement, getElements} from "./generator";

const ServerQueries = {
    apps: async (parent: any, {}: any, context: any) => getElements(Server, context),
    app: async (parent: any, {serverId}: any, context: any) => getElement(Server, serverId, context)
};

const ServerMutations = {

};

export {ServerQueries, ServerMutations};