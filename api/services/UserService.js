const Utils = require('../utils')

module.exports = {
    createService(req, res) {
        const data = req.body;

        // Check fullname, email, username, password
        if (Utils.isEmpty(data.email) || Utils.isEmpty(data.fullname) || Utils.isEmpty(data.username) || Utils.isEmpty(data.password)) {
            return res.send({error: 'Some fileds may not empty!'});
        }

        // Check email
        const isEmail = Utils.isEmail(data.email);
        if (!isEmail) {
            return res.send({error: 'Invalid email'});
        }

        User.create({
            username:   data.username,
            password:   data.password,
            fullname:   data.fullname,
            email:      data.email
        })
        .then(async () => {
            const createdUser = await User.findOne({username: data.username})
    
            if (createdUser)
                return res.json({token: Utils.encrypt({id: createdUser.id, email: data.email, fullname: data.fullname})})
        })
        .catch(err => {
            if (err.raw.code === 11000) {
                const fieldName = (err.raw.message.indexOf('email') === -1 ? 'Username' : 'Email')
                return res.badRequest(fieldName + ' is already!')
            }
            return res.serverError('Something went wrong!')
        })
    },

    async loginService(req, res) {
        const data = req.body;

        const user = await User.findOne({username: data.username});

        if (user) {
            const isMatch = await User.comparePassword(data.password, user.password);
            if (isMatch) {
                if (user.username === 'admin')
                    return res.send({token: Utils.encrypt({id: user.id, email: user.email, fullname: user.fullname, isAdmin: true})})
                return res.send({token: Utils.encrypt({id: user.id, email: user.email, fullname: user.fullname})})
            }
        }

        return res.badRequest({error: 'Username or password is not matched!'});
    },

    async searchService(req, res) {
        if (req.body.search) {
            const search = req.body.search;
            
            // const users = await User.find({or: [
            //     {username: {contains: search}},
            //     {email: search},
            //     {fullname: {regex: new RegExp(search.replace(' ', '.*'), 'i')}}
            // ]})

            const db = sails.getDatastore().manager;
            
            const users = await db.collection('user').find({'$or': [
                {username: {contains: search}},
                {email: search},
                {fullname: {'$regex': new RegExp(search.replace(' ', '.*'), 'i')}}
            ]}).toArray()
    
            if (users.length === 0)
                return res.badRequest({result: 'No user was found'})

            res.send(users)

        }
    },

    viewInfoService(req, res) {
        const userData = req.userData;
        delete req.userData;
        res.send(userData)
    },

    async updateInfoService(req, res) {
        if (req.params.id) {
            const id = req.params.id;
            const input = req.body;
            
            const updatedUser = await User.updateOne({_id: id}, input);
            
            if (!updatedUser) {
                res.badRequest({error: 'User is not found!'});
            }
            
            res.ok({Successed: 'User ' + updatedUser.username + ' was updated!'});

        } else res.badRequest({error: 'User id is neccessary!'})
    },

    async deleteInfoService(req, res) {
        if (req.params.id) {
            const id = req.params.id;
            const user = await User.destroyOne({_id: id});
            if (!user)
                return res.badRequest({error: 'User id is not match with any account'});
    
            res.ok({Result: 'User ' + user.fullname + ' was deleted.'})
        } else {
            res.badRequest({error: 'User id is neccessary!'})
        }
    },

    async getAllUsersService(req, res) {
        const allUser = await User.find();
        res.json({'Total accounts': allUser.length, 'All users': allUser})
    }
}