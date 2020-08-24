import gql from "graphql-tag";

export default gql`
    query GetWorkflows {
        workflows {
            current {
                _id
                name
                owner
                dataClassification
                state
            }
            new {
                _id
                name
                owner
                dataClassification
                state
            }
        }
    }
    query GetWorkflow($serviceId: ID!) {
        workflow(serviceId: $serviceId) {
            current {
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
            new  {
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