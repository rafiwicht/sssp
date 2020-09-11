import gql from "graphql-tag";

/**
 * Contains the queries for the syslog pages
 * Used for code generation
 */
export default gql`
    query GetSyslogs($serviceId: String!) {
        syslogs(serviceId: $serviceId) {
            _id
            serviceId
            index
            sourcetype
            port
            protocol
            hosts
            environmentIds
            state
        }
    }
    mutation PutSyslog($syslogId: String!, $syslogInput: SyslogInput!)  {
        putSyslog(syslogId: $syslogId, syslogInput: $syslogInput) {
            _id
        }
    }
    mutation DeleteSyslog($syslogId: String!)  {
        deleteSyslog(syslogId: $syslogId) {
            _id
        }
    }
`;