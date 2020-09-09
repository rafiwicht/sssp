import Server from "../../models/server";
import {getElement, getElements, deleteElement, putElement} from "./generator";

const ServerQueries = {
    servers: async (parent: any, {serviceId}: any, context: any) => getElements(Server, serviceId, context),
    server: async (parent: any, {serverId}: any, context: any) => getElement(Server, serverId, context)
};

const ServerMutations = {
    putServer: async (parent: any, {serverId, serverInput}: any, context: any) => putElement(Server, serverId, serverInput, context),
    deleteServer: async (parent: any, {serverId}: any, context: any) => deleteElement(Server, serverId, context)
};

export {ServerQueries, ServerMutations};