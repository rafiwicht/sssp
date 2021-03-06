/**
 * Resolver for the https input queries and mutations
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

import {getElement, getElements, putElement, deleteElement} from "./generator";
import Http from "../../models/http";

const HttpQueries = {
    https: async (parent: any, {serviceId, onlyModifications = false}: any, context: any) => getElements(Http, serviceId, onlyModifications, context),
    http: async (parent: any, {httpId}: any, context: any) => getElement(Http, httpId, context)
};

const HttpMutations = {
    putHttp: async (parent: any, {httpId, httpInput}: any, context: any) => putElement(Http, httpId, httpInput, context),
    deleteHttp: async (parent: any, {httpId}: any, context: any) => deleteElement(Http, httpId, context)
};

export {HttpQueries, HttpMutations};