import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_CALLBACK_URL, AUTH0_AUDIENCE } from './tools/configs';

ReactDOM.render(
    <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        redirectUri={AUTH0_CALLBACK_URL}
        audience={AUTH0_AUDIENCE}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);
