import {getElement, getElements} from "./generator";
import Index from "../../models/service";

const IndexQueries = {
    indexes: async (parent: any, {}: any, context: any) => getElements(Index, context),
    index: async (parent: any, {indexId}: any, context: any) => getElement(Index, {indexId}, context)
};

const IndexMutations = {

};

export {IndexQueries, IndexMutations};