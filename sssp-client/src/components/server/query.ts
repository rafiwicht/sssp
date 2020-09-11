import gql from "graphql-tag";

/**
 * Contains the queries for the server pages
 * Used for code generation
 */
export default gql`
    query GetServers($serviceId: String!) {
        servers(serviceId: $serviceId) {
            _id
            serviceId
            hosts
            appIds
            environmentIds
            state
        }
    }
    mutation PutServer($serverId: String!, $serverInput: ServerInput!)  {
        putServer(serverId: $serverId, serverInput: $serverInput) {
            _id
        }
    }
    mutation DeleteServer($serverId: String!)  {
        deleteServer(serverId: $serverId) {
            _id
        }
    }
`;