export function getPublic(req, res) {
    console.log('Calling public endpoint');
    res.json({
        message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
};

export function getPrivate(req, res) {
    console.log('Calling private endpoint');
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
};

export function getPrivateAuthorised(...roles) {
    return (req, res) => {
        console.log('Calling authorised endpoint');
        res.json( {
            message: 'Hello from a private endpoint! You need to be authenticated and have the relevant scopes to see this.',
            required_scopes: roles
        });
    }
};
