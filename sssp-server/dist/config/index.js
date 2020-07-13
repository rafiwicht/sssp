"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Config file
 * @author Rafael Wicht <rafi.wicht139@gmail.com>
 */
exports.default = {
    db: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_SECRET}@${process.env.MONGO}:27017`,
    port: 8080 || process.env.PORT,
    path: '/graphql',
    allowedOrigins: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5000'],
    jwtCertUrl: "http://keycloak:8080/auth/realms/sssp/protocol/openid-connect/certs"
};
//# sourceMappingURL=index.js.map