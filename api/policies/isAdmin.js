const Utils = require('../utils');

module.exports = (req, res, next) => {
    if (req && req.headers && req.headers.token){
        const token = req.headers.token;
        if (token.length < 30) {
            return res.badRequest({error: 'No authorized token was found'})
        }

        let data;
        try {
            data = Utils.verify(token);
        } catch (error) {
            return res.badRequest({error: error.message});
        }

        if (!data.isAdmin)
            return res.badRequest({error: `Don't perrmissiion with this account!`});
            
        next();
    } else {
        return res.badRequest({error: 'No authorized token was found'})
    }
}