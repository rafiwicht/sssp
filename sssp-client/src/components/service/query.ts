import gql from "graphql-tag";

/**
 * Contains the queries for the service pages
 * Used for code generation
 */
export default gql`
    query GetServices {
        services {
            _id
            owner
            dataClassification
            state
        }
    }
    query GetService($serviceId: String!) {
        service(serviceId: $serviceId) {
            _id
            owner
            dataClassification
            description
            state
        }
    }
    mutation PutService($serviceId: String!, $serviceInput: ServiceInput!)  {
        putService(serviceId: $serviceId, serviceInput: $serviceInput) {
            _id
        }
    }
    mutation DeleteService($serviceId: String!)  {
        deleteService(serviceId: $serviceId) {
            _id
        }
    }
`;
