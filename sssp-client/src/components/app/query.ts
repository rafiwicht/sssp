import gql from "graphql-tag";

export default gql`
    query GetApps($serviceId: String!) {
        apps(serviceId: $serviceId) {
            _id
            serviceId
            url
            version
            git
            environmentIds
            state
        }
    }
    mutation PutApp($appId: String!, $appInput: AppInput!)  {
        putApp(appId: $appId, appInput: $appInput) {
            _id
        }
    }
    mutation DeleteApp($appId: String!)  {
        deleteApp(appId: $appId) {
            _id
        }
    }
`;