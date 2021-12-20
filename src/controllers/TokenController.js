const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'image_uploader_secret_key';
class TokenController {
    constructor() {
        this.verifyAuth = this.verifyAuth.bind(this);
    }

    verifyAuth(req, res, next) {
        let token = this.getToken(req);
        let decode = jwt.decode(token, PRIVATE_KEY);
        if (decode != null && decode != undefined) {
            next();
        } else {
            res.status(401).json({ info: "requiere autenticacion" });
        }
    }

    getToken(req) {
        let token = null
        let authorization = req.headers.authorization
        if (authorization != null && authorization != undefined ) {
            let arrayAuth = authorization.split(' ');
            token = arrayAuth[1];
        }
        return token
    }
}

module.exports = {
    TokenController,
    PRIVATE_KEY
};