import gql from "graphql-tag";

export default gql`
    query GetHttps($serviceId: String!) {
        https(serviceId: $serviceId) {
            _id
            serviceId
            token
            environmentIds
            state
        }
    }
    mutation PutHttp($httpId: String!, $httpInput: HttpInput!)  {
        putHttp(httpId: $httpId, httpInput: $httpInput) {
            _id
        }
    }
    mutation DeleteHttp($httpId: String!)  {
        deleteHttp(httpId: $httpId) {
            _id
        }
    }
`;