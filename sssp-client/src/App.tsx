import {hot} from 'react-hot-loader/root'
import React, {useState} from 'react';
import {KeycloakProvider} from '@react-keycloak/web'
import {ApolloProvider} from '@apollo/react-hooks';

import keycloak from "./config/keycloak";
import Main from "./components/Main";
import client from "./config/apollo";
import {Snackbar} from "@material-ui/core";
import Alert from "./components/Alert";

/**
 * Main Gui Component, initializes Keycloak and Apollo
 */
const App: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<Array<string>>([]);
    
    // Display error messages
    const setErrors = (errorMessages: Array<string>) => {
        setMessages(errorMessages);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <KeycloakProvider keycloak={keycloak} initConfig={{onLoad: 'login-required'}}>
            <ApolloProvider client={client({setErrors})}>
                <Main/>
                {messages.map((e, i) => {
                    return(
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} key={i}>
                            <Alert severity='error' onClose={handleClose}>{e}</Alert>
                        </Snackbar>
                    );
                })}
            </ApolloProvider>
        </KeycloakProvider>
    );
}

export default hot(App);
