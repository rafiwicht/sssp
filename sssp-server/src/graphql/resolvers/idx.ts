import {getElement, getElements, putElement, deleteElement} from "./generator";
import Index from "../../models/idx";

const IndexQueries = {
    indexes: async (parent: any, {serviceId}: any, context: any) => {
        const indexes = getElements(Index, serviceId, context);
        console.log(indexes);
        return indexes;
    },
    index: async (parent: any, {indexId}: any, context: any) => getElement(Index, indexId, context)
};

const IndexMutations = {
    putIndex: async (parent: any, {indexId, indexInput}: any, context: any) => putElement(Index, indexId, indexInput, context),
    deleteIndex: async (parent: any, {indexId}: any, context: any) => deleteElement(Index, indexId, context)
};

export {IndexQueries, IndexMutations};