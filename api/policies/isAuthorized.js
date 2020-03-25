module.exports = (req, res, next) => {
    let token;

    // Check token in headers
    if (req.headers && req.headers.token) {
        token = req.headers.token;
        if (token.length <= 0) 
            return res.status(401).json({err: 'Format is Authorization: Baerer + [token]'});
    }
    else if (req.params['token']) {
        token = req.params['token'];
        delete req.query.token;
    } else {
        return res.status(401).json({err: 'No Authorization header was found'});
    }

    jwt.verify(token, (err, token) => {
        if (err) //return res.badRequest(ErrorSystem.SYSTEM_PERMISSION_FAIL)
            return res.status(401).json({error: 'Invalid token!'})
        req.token = token;
        next();
    })
}