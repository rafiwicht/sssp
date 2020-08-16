import gql from "graphql-tag";

export default gql`
query GetSourcetype($serviceId: ID!, $sourcetypeId: ID!) {
    sourcetype(serviceId: $serviceId, sourcetypeId: $sourcetypeId) {
        _id
        name
        fields {
            _id
            key
            value
        }
    }
},
mutation UpdateSourcetype($serviceId: ID!, $sourcetypeId: ID!, $sourcetypeInput: SourcetypeInput!)  {
    updateSourcetype(serviceId: $serviceId, sourcetypeId: $sourcetypeId, sourcetypeInput: $sourcetypeInput) {
        name
    }
}
`;