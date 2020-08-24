import ApolloClient from 'apollo-client';
import {createHttpLink} from 'apollo-link-http'
import { onError } from 'apollo-link-error';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import keycloak from "./keycloak";

type ApolloProps = {
    setErrors: (messages: Array<string>) => void
}

export default ({setErrors}: ApolloProps) => {

    const errorLink = onError(({ response, operation, graphQLErrors, networkError, forward }) => {
        let errors: Array<string> = []
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path, extensions }) => {
                if(extensions?.code === 'UNAUTHENTICATED') {
                    console.log('refresh token --------------------------------');
                    keycloak.updateToken(5).then(() => {
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
        if (networkError) {
            errors.push(networkError.message);
        }
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
        cache: new InMemoryCache(),
    });
}
