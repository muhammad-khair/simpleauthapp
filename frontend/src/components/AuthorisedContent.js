import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react';
import { AUTHORISED_WELCOME_URL } from '../tools/configs';

function AuthorisedContent() {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [messageContent, setMessageContent] = useState('Loading content');

    useEffect(() => {
        if (!isAuthenticated) {
            setMessageContent('Not authenticated to view content');
            return;
        }
        getAccessTokenSilently().then(
            (token) => {
                axios.get(AUTHORISED_WELCOME_URL, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((res) => {
                    setMessageContent(res.data.message);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        setMessageContent('Not authenticated to view content');
                    } else if (err.response && err.response.status === 403) {
                        setMessageContent('Not authorised to view content');
                    } else {
                        setMessageContent('Unable to load content');
                    }
                });
            }
        );
    }, [isAuthenticated, getAccessTokenSilently, setMessageContent]);

    return (
        <div>
            <Box>
                <Typography>{messageContent}</Typography>
            </Box>
        </div>
    );
};

export default AuthorisedContent;
