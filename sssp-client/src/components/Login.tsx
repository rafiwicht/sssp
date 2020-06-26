/**
 *  Login screen of the frontend
 */
import React, {useEffect} from 'react';
import Keycloak from 'keycloak-js';

export const Login: React.FC = () => {
    useEffect(() => {
        if (localStorage.getItem('keycloak') && localStorage.getItem('authenticated')) {
            const keycloak = Keycloak('keycloak.json');
            keycloak.init({onLoad: 'login-required'}).then(authenticated => {
                localStorage.setItem('keycloak', JSON.stringify(keycloak));
                localStorage.setItem('authenticated', JSON.stringify(authenticated));
                console.log(keycloak);
                console.log(authenticated);
            })
        }
    });

    return (
        <div>Initializing Keycloak...</div>
    );
}