import {hot} from 'react-hot-loader/root'
import React from 'react';
import {KeycloakProvider} from '@react-keycloak/web'
import {ApolloProvider} from '@apollo/react-hooks';

import keycloak from "./singletons/keycloak";
import Main from "./components/Main";
import client from "./config/apollo";


const App: React.FC = () => {
    return (
        <KeycloakProvider keycloak={keycloak} initConfig={{onLoad: 'login-required'}}>
            <ApolloProvider client={client}>
                <Main/>
            </ApolloProvider>
        </KeycloakProvider>
    );
}

export default hot(App);
