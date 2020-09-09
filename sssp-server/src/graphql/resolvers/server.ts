import Server from "../../models/server";
import {getElement, getElements, deleteElement, putElement, acceptChange, rejectChange} from "./generator";

const ServerQueries = {
    servers: async (parent: any, {serviceId}: any, context: any) => getElements(Server, serviceId, context),
    server: async (parent: any, {serverId}: any, context: any) => getElement(Server, serverId, context)
};

const ServerMutations = {
    putServer: async (parent: any, {serverId, serverInput}: any, context: any) => putElement(Server, serverId, serverInput, context),
    deleteServer: async (parent: any, {serverId}: any, context: any) => deleteElement(Server, serverId, context),
    acceptServerChange: async (parent: any, {serverId}: any, context: any) => acceptChange(Server, serverId, context),
    rejectServerChange: async (parent: any, {serverId}: any, context: any) => rejectChange(Server, serverId, context)
};

export {ServerQueries, ServerMutations};