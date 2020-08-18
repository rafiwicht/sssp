import ApolloClient from 'apollo-client';
import {createHttpLink} from 'apollo-link-http'
import { onError } from 'apollo-link-error';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import keycloak from "../singletons/keycloak";

type ApolloProps = {
    setErrors: (messages: Array<string>) => void
}

export default ({setErrors}: ApolloProps) => {
    const errorLink = onError(({ response, operation, graphQLErrors, networkError }) => {
        let errors: Array<string> = []
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) => {
                errors.push(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path ${path}`);
            });
        }
        if (networkError) errors.push(`[Network error]: ${networkError}`);
        setErrors(errors);
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

    return new ApolloClient({
        link: authLink.concat(errorLink).concat(httpLink),
        cache: new InMemoryCache()
    });
}
