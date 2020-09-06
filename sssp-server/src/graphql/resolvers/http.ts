import {getElement, getElements} from "./generator";
import Http from "../../models/service";

const HttpQueries = {
    https: async (parent: any, {}: any, context: any) => getElements(Http, context),
    http: async (parent: any, {httpId}: any, context: any) => getElement(Http, {httpId}, context)
};

const HttpMutations = {

};

export {HttpQueries, HttpMutations};