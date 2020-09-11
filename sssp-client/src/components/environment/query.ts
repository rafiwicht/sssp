import gql from "graphql-tag";

/**
 * Contains the queries for the environment pages
 * Used for code generation
 */
export default gql`
    query GetEnvironments {
        environments {
            _id
            userAccess
        }
    }
    mutation PutEnvironment($environmentId: String!, $environmentInput: EnvironmentInput!)  {
        putEnvironment(environmentId: $environmentId environmentInput: $environmentInput) {
            _id
        }
    }
    mutation DeleteEnvironment($environmentId: String!)  {
        deleteEnvironment(environmentId: $environmentId) {
            _id
        }
    }
`;