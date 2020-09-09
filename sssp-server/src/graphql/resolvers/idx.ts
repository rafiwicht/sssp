import {getElement, getElements, putElement, deleteElement, acceptChange, rejectChange} from "./generator";
import Index from "../../models/idx";

const IndexQueries = {
    indexes: async (parent: any, {serviceId}: any, context: any) => getElements(Index, serviceId, context),
    index: async (parent: any, {indexId}: any, context: any) => getElement(Index, indexId, context)
};

const IndexMutations = {
    putIndex: async (parent: any, {indexId, indexInput}: any, context: any) => putElement(Index, indexId, indexInput, context),
    deleteIndex: async (parent: any, {indexId}: any, context: any) => deleteElement(Index, indexId, context),
    acceptIndexChange: async (parent: any, {indexId}: any, context: any) => acceptChange(Index, indexId, context),
    rejectIndexChange: async (parent: any, {indexId}: any, context: any) => rejectChange(Index, indexId, context)
};

export {IndexQueries, IndexMutations};