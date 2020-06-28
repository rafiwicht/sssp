import Keycloak from 'keycloak-js';
import keycloakClient from "../config/keycloak";

const keycloak = Keycloak(keycloakClient);
export default keycloak;