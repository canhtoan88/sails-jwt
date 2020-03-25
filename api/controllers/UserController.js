module.exports = {
    create: (req, res) => {
        UserService.createService(req, res);
    },

    login: (req, res) => {
        UserService.loginService(req, res);
    },

    getAllUsers: (req, res) => {
        UserService.getAllUsersService(req, res);
    }
}