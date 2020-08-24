import gql from "graphql-tag";

export default gql`
    query GetServices($kind: Kind) {
        services(kind: $kind) {
            _id
            name
            owner
            dataClassification
            state
        }
    }
    query GetService($serviceId: ID!, $kind: Kind) {
        service(serviceId: $serviceId, kind: $kind) {
            _id
            name
            owner
            state
            dataClassification
            description
            indexes {
                _id
                name
                maxTotalDataSizeMB
                frozenTimePeriodInSecs
            }
            apps {
                _id
                name
                type
                url
            }
            read
            write
        }
    }
    mutation CreateService($serviceInput: ServiceInput!)  {
        createService(serviceInput: $serviceInput) {
            name
        }
    }
    mutation UpdateService($serviceId: ID!, $serviceInput: ServiceInput!)  {
        updateService(serviceId: $serviceId, serviceInput: $serviceInput) {
            name
        }
    }
    mutation DeleteService($serviceId: ID!)  {
        deleteService(serviceId: $serviceId) {
            name
        }
    }
`;
