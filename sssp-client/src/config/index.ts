

export default {
    firm: process.env.FIRM || 'SSSP',
    adminRole: process.env.ADMIN_ROLE || 'sssp-admin',
    keycloakUrl: process.env.KEYCLOAK_URL || "https://test.sssp.local:8000/auth/",
    keycloakRealm: process.env.KEYCLOAK_REALM || "sssp",
    keycloakClientId: process.env.KEYCLOAK_CLIENT_ID || "sssp-client"
}