/**
 * Resolver for the app queries and mutations
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import App from "../../models/app";
import {putElement, getElement, getElements, deleteElement} from "./generator";

const AppQueries = {
    apps: async (parent: any, {serviceId, onlyModifications = false}: any, context: any) => getElements(App, serviceId, onlyModifications, context),
    app: async (parent: any, {appId}: any, context: any) => getElement(App, appId, context)
};

const AppMutations = {
    putApp: async (parent: any, {appId, appInput}: any, context: any) => putElement(App, appId, appInput, context),
    deleteApp: async (parent: any, {appId}: any, context: any) => deleteElement(App, appId, context)
};

export {AppQueries, AppMutations};