const Utils = require('../utils')

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

    let userData; 
    try {
        userData = Utils.verify(token);
    } catch (error) {
        return res.badRequest('Token error: ' + error.message);
    }
    
    if (!userData) 
        return res.badRequest({error: 'Invalid token'});
        
    req.userData = userData;
    next();
}