import gql from 'graphql-tag';


export default gql`
    query GetAdmins {
        admins
    }
    query IsAdmin ($userId: String!) {
        admin(userId: $userId)
    },
    mutation CreateAdmin($userId: String!)  {
        createAdmin(userId: $userId)
    }
    mutation DeleteAdmin($userId: String!)  {
        deleteAdmin(userId: $userId)
    }
`;