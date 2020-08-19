/**
 * Config file
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */

export default {
    db: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_SECRET}@${process.env.MONGO}:27017`,
    port: process.env.PORT || 5000,
    path: '/graphql',
    allowedOrigins: ['*'],
    jwtCertUrl: 'http://localhost:8080/auth/realms/sssp/protocol/openid-connect/certs',
    jwtFileName: 'certs',
    githubToken: process.env.GITHUB_TOKEN,
    githubOrg: process.env.GITHUB_ORG || 'sssp-test',
    adminRole: process.env.ADMIN_ROLE || 'sssp-admin'
};