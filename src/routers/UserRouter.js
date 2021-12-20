const {Router} = require('express');
const UserController = require('../controllers/UserController');
class UserRouter {
    constructor() {
        this.router = new Router();
        this.#config();
    }

    #config() {
        const objUserC = new UserController();
        this.router.post('/auth/register', objUserC.register);
        this.router.post('/auth/login', objUserC.login);
    }
}

module.exports = UserRouter;