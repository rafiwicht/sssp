import App from "../../models/service";
import {putElement, getElement, getElements, deleteElement} from "./generator";

const AppQueries = {
    apps: async (parent: any, params: any, context: any) => getElements(App, context),
    app: async (parent: any, params: any, context: any) => getElement(App, params, context)
};

const AppMutations = {
    putApp: async (parent: any, params: any, context: any) => putElement(App, params, context),
    deleteApp: async (parent: any, params: any, context: any) => deleteElement(App, params, context)
};

export {AppQueries, AppMutations};