const {Router} = require('express');
const PhotoController = require("../controllers/PhotoController");
const { PRIVATE_KEY, TokenController } = require("../controllers/TokenController");


class PhotoRouter {
    constructor() {
        this.router = new Router();
        this.objTokenC = new TokenController();
        this.#config();
    }

    #config() {
        const objPhotoC =  new PhotoController();
        this.router.get('/user/photo/upload/:id', objPhotoC.getPhoto);
        this.router.post("/user/photo",objPhotoC.addPhoto )
    }
}

module.exports = PhotoRouter;