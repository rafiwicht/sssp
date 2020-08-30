import Keycloak from 'keycloak-js';
import config from '.';

const keycloak = Keycloak({
    url: config.keycloakUrl,
    realm: config.keycloakRealm,
    clientId: config.keycloakClientId
});

export default keycloak;