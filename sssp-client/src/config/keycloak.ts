import Keycloak from 'keycloak-js';
import config from '.';

/**
 * Initialize keycloak client
 */

const keycloak = Keycloak({
    url: config.keycloakUrl,
    realm: config.keycloakRealm,
    clientId: config.keycloakClientId
});

export default keycloak;