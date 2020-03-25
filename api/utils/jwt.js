const jwt = require('jsonwebtoken');
const tokenSecret = sails.config.custom.tokenSecret;

module.exports = {
    encrypt(input) {
        return jwt.sign(input, tokenSecret, {expiresIn: '1 min'})
    },
    verify(token, callback) {
        try {
            return jwt.verify(token, tokenSecret, {}, callback)
        } catch (error) {
            return sails.log.warn('Token error: ' + JSON.stringify(error));
        }
    }
}