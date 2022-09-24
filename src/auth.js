import { expressjwt } from 'express-jwt';
import jwks from 'jwks-rsa';
import jwtAuthz from 'express-jwt-authz';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_JWKRS_URI || !process.env.JWT_AUDIENCE || !process.env.JWT_ISSUER) {
    throw new Error('Jwt process variables are not defined');
}

const checkJwt = expressjwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWT_JWKRS_URI
    }),
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    algorithms: ['RS256']
});

const checkScopes = (...scopes) => jwtAuthz(scopes);

export { checkJwt, checkScopes };
