import gql from "graphql-tag";

export default gql`
    query GetEnvironments {
        environments {
            _id
            userAccess
        }
    }
    mutation CreateEnvironment($environmentInput: EnvironmentInput!)  {
        createEnvironment(environmentInput: $environmentInput) {
            _id
        }
    }
    mutation UpdateEnvironment($environmentInput: EnvironmentInput!)  {
        updateEnvironment(environmentInput: $environmentInput) {
            _id
        }
    }
    mutation DeleteEnvironment($environmentId: String!)  {
        deleteEnvironment(environmentId: $environmentId) {
            _id
        }
    }
`;