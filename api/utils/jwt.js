const jwt = require('jsonwebtoken');
const tokenSecret = sails.config.custom.tokenSecret;

module.exports = {
    encrypt(input) {
        return jwt.sign(input, tokenSecret, {expiresIn: '1 min'})
    },
    verify(token) {
        return jwt.verify(token, tokenSecret)
    }
}