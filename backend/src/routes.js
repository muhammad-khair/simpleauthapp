import express from 'express';
import { getPublic, getPrivate, getPrivateAuthorised } from './service.js';
import { checkJwt, checkScopes } from './auth.js';
import { READ_MESSAGES } from './roles.js';

const router = new express.Router();

router.get('/', (req, res) => {
    console.log('/api route called');
    res.json();
});

router.route('/welcome')
    .get(getPublic);

router.route('/welcome-user')
    .get(checkJwt, getPrivate);

router.route('/welcome-user-authorised')
    .get(checkJwt, checkScopes(READ_MESSAGES), getPrivateAuthorised(READ_MESSAGES));

export default router;
