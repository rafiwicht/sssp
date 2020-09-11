import gql from "graphql-tag";

/**
 * Contains the queries for the workflow pages
 * Used for code generation
 */
export default gql`
    query GetChangedApps($onlyModifications: Boolean!) {
        apps(onlyModifications: $onlyModifications) {
            _id
            serviceId
            url
            version
            git
            environmentIds
            state
            changes {
                url
                version
                git
                environmentIds
            }
        }
    }
    query GetChangedHttps($onlyModifications: Boolean!) {
        https(onlyModifications: $onlyModifications) {
            _id
            serviceId
            token
            environmentIds
            state
            changes {
                token
                environmentIds
            }
        }
    }
    query GetChangedIndexes($onlyModifications: Boolean!) {
        indexes(onlyModifications: $onlyModifications) {
            _id
            serviceId
            maxTotalDataSizeMB
            frozenTimePeriodInSecs
            environmentIds
            state
            changes {
                maxTotalDataSizeMB
                frozenTimePeriodInSecs
                environmentIds
            }
        }
    }
    query GetChangedServers($onlyModifications: Boolean!) {
        servers(onlyModifications: $onlyModifications) {
            _id
            serviceId
            hosts
            appIds
            environmentIds
            state
            changes {
                hosts
                appIds
                environmentIds
            }
        }
    }
    query GetChangedServices($onlyModifications: Boolean!) {
        services(onlyModifications: $onlyModifications) {
            _id
            owner
            description
            dataClassification
            state
            changes {
                owner
                description
                dataClassification
            }
        }
    }
    query GetChangedSyslogs($onlyModifications: Boolean!) {
        syslogs(onlyModifications: $onlyModifications) {
            _id
            serviceId
            index
            sourcetype
            port
            protocol
            hosts
            environmentIds
            state
            changes {
                index
                sourcetype
                port
                protocol
                hosts
                environmentIds
            }
        }
    }
    mutation AcceptChange($id: String!, $resource: Resource!) {
        acceptChange(id: $id, resource: $resource)
    }
    mutation RejectChange($id: String!, $resource: Resource!) {
        rejectChange(id: $id, resource: $resource)
    }
`;