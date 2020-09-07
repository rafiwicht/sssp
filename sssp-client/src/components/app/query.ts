import gql from "graphql-tag";

export default gql`
    query GetApps {
        apps {
            _id
            serviceId
            url
            version
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