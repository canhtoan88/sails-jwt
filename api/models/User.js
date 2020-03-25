const bcrypt = require('bcrypt');

module.exports = {
    attributes: {
        username: {
            type: 'string',
            unique: true
        },
        password: {
            type: 'string'
        },
        fullname: {
            type: 'string'
        }
    },

    beforeCreate(value, next) {
        const saltRound = sails.config.custom.saltRound;
        const salt = bcrypt.genSaltSync(saltRound);
        value.password = bcrypt.hashSync(value.password, salt);
        // Auto-gen salt
        // value.encryptedPassword = bcrypt.hashSync(value.password, saltRound);
        next();
    },

    comparePassword(password, encryptedPassword) {
        return bcrypt.compareSync(password, encryptedPassword);
    }
}
