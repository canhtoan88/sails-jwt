const validator = require('./validator');
const jwt = require('./jwt');

module.exports = {
    isEmail:    validator.isEmail,
    isEmpty:    validator.isEmpty,
    encrypt:    jwt.encrypt,
    verify:     jwt.verify
}