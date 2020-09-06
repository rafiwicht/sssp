import gql from "graphql-tag";

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
    mutation CreateService($serviceInput: ServiceInput!)  {
        createService(serviceInput: $serviceInput) {
            _id
        }
    }
    mutation UpdateService($serviceInput: ServiceInput!)  {
        updateService(serviceInput: $serviceInput) {
            _id
        }
    }
    mutation DeleteService($serviceId: String!)  {
        deleteService(serviceId: $serviceId) {
            _id
        }
    }
`;
