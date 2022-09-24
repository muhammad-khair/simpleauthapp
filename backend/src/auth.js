import { expressjwt } from 'express-jwt';
import jwks from 'jwks-rsa';
import jwtAuthz from 'express-jwt-authz';
import jwt_decode from 'jwt-decode';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_AUDIENCE || !process.env.JWT_ISSUER) {
    throw new Error('Jwt process variables are not defined');
}

const checkJwt = expressjwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.JWT_ISSUER}/.well-known/jwks.json`
    }),
    audience: `https://${process.env.JWT_AUDIENCE}`,
    issuer: `https://${process.env.JWT_ISSUER}/`,
    algorithms: ['RS256']
});

const USE_NAIVE_CHECK = true;
const naiveScopeCheck = (scopes) => function(req, res, next) {
    if (!req.headers || !req.headers.authorization || req.headers.authorization.indexOf(' ') < 0) {
        return res.status(403).json();
    }
    const token = jwt_decode(req.headers.authorization.split(" ")[1]);
    if (!token.permissions || !Array.isArray(token.permissions) || scopes.length !== token.permissions.length) {
        return res.status(403).json();
    }
    let sortedPerms = token.permissions.sort();
    let sortedScopes = scopes.sort();
    for (var i = 0; i < sortedPerms.length; i++) {
        if (sortedPerms[i] !== sortedScopes[i]) {
            return res.status(403).json();
        }
    }
    next();
};

const checkScopes = (...scopes) => {
    return (USE_NAIVE_CHECK)
        ? naiveScopeCheck(scopes)
        : jwtAuthz(scopes, {
            customScopeKey: "permissions",
            checkAllScopes: true,
            failWithError: true,
        });
};

export { checkJwt, checkScopes };
