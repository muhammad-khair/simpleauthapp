import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { PUBLIC_WELCOME_URL } from '../tools/configs';

function PublicContent() {

    const [messageContent, setMessageContent] = useState('Loading content');

    useEffect(() => {
        axios.get(PUBLIC_WELCOME_URL)
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
    }, [setMessageContent]);

    return (
        <div>
            <Box>
                <Typography>{messageContent}</Typography>
            </Box>
        </div>
    );
};

export default PublicContent;
