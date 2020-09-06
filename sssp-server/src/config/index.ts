/**
 * Default configuration file, load the env variables
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

export default {
    // App defaults
    path: '/graphql',
    allowedOrigins: ['*'],
    port: process.env.PORT || 5000,
    devToken: process.env.DEV_TOKEN,

    // Mongodb connection
    db: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_SECRET}@${process.env.MONGO}:${process.env.MONGO_PORT || 27017}`,

    // Ldap admin role
    adminRole: process.env.ADMIN_ROLE || 'sssp-admin',

    // Keycloak offline validation
    jwtCertUrl: process.env.JWT_CERT_URL || 'http://127.0.0.1:8080/auth/realms/sssp/protocol/openid-connect/certs',

    // Github connector
    githubToken: process.env.GITHUB_TOKEN,
    githubOrg: process.env.GITHUB_ORG || 'sssp-test',

    // Gitlab connector
    gitlabToken: process.env.GITLAB_TOKEN,
    gitlabUrl: process.env.GITLAB_URL || 'http://127.0.0.1',
    gitlabUser: process.env.GITLAB_USER || 'root',
    gitlabPubUrl: process.env.GITLAB_PUB_URL || process.env.GITLAB_URL || 'http://test.sssp.local:7080',

    // Splunk index defaults
    maxTotalDataSizeMB: process.env.MAX_TOTAL_DATA_SIZE_MB || 100000000,
    frozenTimePeriodInSecs: process.env.FROZEN_TIME_PERION_IN_SECONDS || 7776000,

    // Group mapping
    prefixLDAPGroups: process.env.PREFIX_LDAP_GROUPS || "svc_",
};