import Syslog from "../../models/syslog";
import {getElement, getElements, putElement, deleteElement} from "./generator";

const SyslogQueries = {
    syslogs: async (parent: any, {serviceId, onlyModifications = false}: any, context: any) => getElements(Syslog, serviceId, onlyModifications, context),
    syslog: async (parent: any, {syslogId}: any, context: any) => getElement(Syslog, syslogId, context)
};

const SyslogMutations = {
    putSyslog: async (parent: any, {syslogId, syslogInput}: any, context: any) => putElement(Syslog, syslogId, syslogInput, context),
    deleteSyslog: async (parent: any, {syslogId}: any, context: any) => deleteElement(Syslog, syslogId, context)
};

export {SyslogQueries, SyslogMutations};