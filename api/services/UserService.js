const jwt = require('../utils/jwt')

module.exports = {
    createService(req, res) {
        const data = req.body;

        User.create({
            username: data.username,
            password: data.password,
            fullname: data.fullname
        })
        .then(async () => {
            const createdUser = await User.findOne({username: data.username})
    
            if (createdUser)
                return res.json({token: jwt.encrypt({id: createdUser._id})})
        })
        .catch(err => {
            if (err.raw.code === 11000) {
                return res.badRequest('Username is already!')
            }
            return res.serverError('Something went wrong!')
        })
    },

    async loginService(req, res) {
        const data = req.body;

        const user = await User.findOne({username: data.username});

        if (user) {
            const isMatch = await User.comparePassword(data.password, user.password);
            if (isMatch)
                return res.send({token: jwt.encrypt({id: user._id})})
        }

        return res.badRequest({error: 'Username or password is not matched!'});
    },

    async getAllUsersService(req, res) {
        const allUser = await User.find();
        res.json({'Total accounts': allUser.length, 'All users': allUser})
    }
}