import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
    url: "https://test.sssp.local:8000/auth/",
    realm: "sssp",
    clientId: "sssp-client"
});

export default keycloak;