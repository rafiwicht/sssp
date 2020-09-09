import Syslog from "../../models/syslog";
import {getElement, getElements, putElement, deleteElement, acceptChange, rejectChange} from "./generator";

const SyslogQueries = {
    syslogs: async (parent: any, {serviceId}: any, context: any) => getElements(Syslog, serviceId, context),
    syslog: async (parent: any, {syslogId}: any, context: any) => getElement(Syslog, syslogId, context)
};

const SyslogMutations = {
    putSyslog: async (parent: any, {syslogId, syslogInput}: any, context: any) => putElement(Syslog, syslogId, syslogInput, context),
    deleteSyslog: async (parent: any, {syslogId}: any, context: any) => deleteElement(Syslog, syslogId, context),
    acceptSyslogChange: async (parent: any, {syslogId}: any, context: any) => acceptChange(Syslog, syslogId, context),
    rejectSyslogChange: async (parent: any, {syslogId}: any, context: any) => rejectChange(Syslog, syslogId, context)
};

export {SyslogQueries, SyslogMutations};