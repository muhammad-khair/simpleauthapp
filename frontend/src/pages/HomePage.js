import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserContent from '../components/UserContent';
import PublicContent from '../components/PublicContent';
import AuthorisedContent from '../components/AuthorisedContent';

function HomePage() {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const getStatus = () => {
        return (isAuthenticated === true)
            ? `User ${user.name} logged in`
            : "Please log in";
    };

    return (
        <div>
            <Button
                variant={"outlined"}
                sx={{ m: 2 }}
                onClick={() => loginWithRedirect()}
            >
                Log In
            </Button>
            <Button
                variant={"outlined"}
                sx={{ m: 2 }}
                onClick={() => logout({ returnTo: window.location.origin })}
            >
                Log Out
            </Button>
            <Typography>{getStatus()}</Typography>
            <Box>
                <PublicContent />
                <UserContent />
                <AuthorisedContent />
            </Box>
        </div>
    );
}

export default HomePage;
