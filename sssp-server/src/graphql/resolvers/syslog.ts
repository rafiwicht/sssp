import Syslog from "../../models/syslog";
import {getElement, getElements} from "./generator";

const SyslogQueries = {
    syslogs: async (parent: any, {}: any, context: any) => getElements(Syslog, context),
    syslog: async (parent: any, {syslogId}: any, context: any) => getElement(Syslog, syslogId, context)
};

const SyslogMutations = {

};

export {SyslogQueries, SyslogMutations};