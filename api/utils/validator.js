const validator = require('validator');

module.exports = {
    isEmail(email) {
        return validator.isEmail(email);
    },
    isEmpty(str) {
        return validator.isEmpty(str);
    }
}