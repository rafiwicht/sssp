import gql from "graphql-tag";

export default gql`
    query GetServices {
        services {
            _id
            name
            owner
            state
        }
    },
    query GetService($serviceId: ID!) {
        service(serviceId: $serviceId) {
            _id
            name
            owner
            state
        }
    },
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
