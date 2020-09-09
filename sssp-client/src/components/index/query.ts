import gql from "graphql-tag";

export default gql`
    query GetIndexes($serviceId: String!) {
        indexes(serviceId: $serviceId) {
            _id
            serviceId
            maxTotalDataSizeMB
            frozenTimePeriodInSecs
            environmentIds
            state
        }
    }
    mutation PutIndex($indexId: String!, $indexInput: IndexInput!)  {
        putIndex(indexId: $indexId, indexInput: $indexInput) {
            _id
        }
    }
    mutation DeleteIndex($indexId: String!)  {
        deleteIndex(indexId: $indexId) {
            _id
        }
    }
`;