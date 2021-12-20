const {Router} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const {PRIVATE_KEY} = require('./TokenController');

class UserController {

    register (req, res) {
        let objUser = req.body
        if (objUser.password && objUser.name && objUser.email && objUser.lastname) {
            User.create(objUser, (error, data) => {
                if(!error ) {
                    let token = jwt.sign({data},PRIVATE_KEY )
                    res.status(200).json({token})
                } else {
                    res.status(500).json({info: error})
                }
            })
        } else {
            res.status(400).json({info: 'Faltan datos'})
        }
    }

    login(req, res) {
        let {email , password} = req.body
        if (email && password) {
            User.findOne({email, password}, (error, data) => {
                if (!error && data) {
                    let token = jwt.sign({data},PRIVATE_KEY )
                    res.status(200).json({token})
                } else {
                    res.status(401).json({info: "credenciales incorrectas"})
                }
            })
        } else {
            res.status(400).json({info: 'Faltan datos'})
        }
    }
}

module.exports = UserController;