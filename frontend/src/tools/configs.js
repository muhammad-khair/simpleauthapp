const BASE_SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const PUBLIC_WELCOME_URL = `${BASE_SERVER_URL}/api/welcome`;
export const USER_WELCOME_URL = `${BASE_SERVER_URL}/api/welcome-user`;
export const AUTHORISED_WELCOME_URL = `${BASE_SERVER_URL}/api/welcome-user-authorised`;

export const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
export const AUTH0_CALLBACK_URL = process.env.REACT_APP_AUTH0_CALLBACK_URL;
export const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE;
