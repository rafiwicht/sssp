import gql from "graphql-tag";

export default gql`
    query GetWorkflow($serviceId: ID!) {
        workflow(serviceId: $serviceId) {
            _id
            name
            owner
            state
            dataClassification
            description
            indexes {
                name
                maxTotalDataSizeMB
                frozenTimePeriodInSecs
            }
            apps {
                name
                type
                url
                version
            }
            read
            write
        }
    }
   mutation AcceptWorkflow($serviceId: ID!) {
       acceptWorkflow(serviceId: $serviceId) {
           name
       }
   }
    mutation DeclineWorkflow($serviceId: ID!) {
        declineWorkflow(serviceId: $serviceId) {
            name
        }
    }
`;