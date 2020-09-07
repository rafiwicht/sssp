import Syslog from "../../models/syslog";
import {getElement, getElements, putElement, deleteElement} from "./generator";

const SyslogQueries = {
    syslogs: async (parent: any, {serviceId}: any, context: any) => getElements(Syslog, serviceId, context),
    syslog: async (parent: any, {syslogId}: any, context: any) => getElement(Syslog, syslogId, context)
};

const SyslogMutations = {
    putServer: async (parent: any, {syslogId, syslogInput}: any, context: any) => putElement(Syslog, syslogId, syslogInput, context),
    deleteServer: async (parent: any, {syslogId}: any, context: any) => deleteElement(Syslog, syslogId, context)
};

export {SyslogQueries, SyslogMutations};