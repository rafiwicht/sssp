/**
 * Config file
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

export default {
    db: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_SECRET}@${process.env.MONGO}:27017`,
    port: process.env.PORT || 5000,
    path: '/graphql',
    allowedOrigins: ['*'],
    jwtCertUrl: 'http://127.0.0.1:8080/auth/realms/sssp/protocol/openid-connect/certs',
    jwtFileName: 'certs',

    githubToken: process.env.GITHUB_TOKEN,
    githubOrg: process.env.GITHUB_ORG || 'sssp-test',

    gitlabToken: process.env.GITLAB_TOKEN,
    gitlabUrl: process.env.GITLAB_URL || 'http://127.0.0.1',
    gitlabUser: process.env.GITLAB_USER || 'root',
    gitlabPubUrl: process.env.GITLAB_PUB_URL || process.env.GITLAB_URL || 'http://sssp.rwicht.ch:7080',
    adminRole: process.env.ADMIN_ROLE || 'sssp-admin'
};