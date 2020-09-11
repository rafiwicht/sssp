import ApolloClient from 'apollo-client';
import {createHttpLink} from 'apollo-link-http'
import { onError } from 'apollo-link-error';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import keycloak from "./keycloak";

type ApolloProps = {
    setErrors: (messages: Array<string>) => void
}

/**
 * Apollo props
 */
export default ({setErrors}: ApolloProps) => {

    const errorLink = onError(({ response, operation, graphQLErrors, networkError, forward }) => {
        let errors: Array<string> = []
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path, extensions }) => {
                // If the token expires, automatically renew it
                if(extensions?.code === 'UNAUTHENTICATED') {
                    keycloak.updateToken(120).then(() => {
                        operation.setContext({
                            headers: {
                                authorization: `Bearer ${keycloak.token}`,
                            }
                        });
                        return forward(operation);
                    });
                }
                else {
                    errors.push(message);
                }
            });
        }
        // Display connection issues to the console
        else if(networkError) {
            console.log(networkError);
        }
        setErrors(errors);
    })


    const httpLink = createHttpLink({
        uri: '/graphql',
    });

    // Add keycloak token to header
    const authLink = setContext((_, {headers}) => {
        const token = keycloak?.token
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        };
    });

    // Initialize client with cache
    return new ApolloClient({
        link: authLink.concat(errorLink).concat(httpLink),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'cache-and-network'
            }
        }
    });
}
