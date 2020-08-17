import ApolloClient from 'apollo-client';
import {createHttpLink} from 'apollo-link-http'
import { onError } from 'apollo-link-error';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import keycloak from "../singletons/keycloak";


const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path ${path}`
            );
        });
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
})


const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, {headers}) => {
    const token = keycloak?.token
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache()
});

export default client;