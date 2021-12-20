const { Router } = require("express");
const jwt = require("jsonwebtoken");
const Photo = require("../models/PhotoModel");
const { PRIVATE_KEY, TokenController } = require("./TokenController");


class PhotoController {
    constructor() {
        this.objTokenC = new TokenController();
    }

    getPhoto = async (req, res) => {
        let {id} = req.params;
        const photo = await Photo.findById({ _id: id });
        res.status(200).json(photo);
    }

    addPhoto = (req, res)=>  {
        let decode = jwt.decode(this.objTokenC.getToken(req), PRIVATE_KEY);
        Photo.create(
            {
                photoname: req.file.filename ,
                originalname: req.file.originalname ,
                path: "storage/imgs/" + req.file.filename ,
                mimetype: req.file.mimetype,
                size: req.file.size,
                created: Date.now(),
                user_id: decode.data._id,
            },
            ( error, data ) =>
            {
                if ( !error )
                {
                    data.save();
                    res.status(201).json( { message: "Photo added", data } );
                } else
                {
                    console.log( error );
                    res.status( 500 ).json( { message: "Error" } );
                }
            }
        );
    }
}

module.exports = PhotoController;