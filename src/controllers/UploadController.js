const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const { cloud_db } = require( "../database/urlDb" );

const storage = new GridFsStorage({
    url: "mongodb://localhost:27017/imageUploader",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
        bucketName: "photos",
        filename: file.originalname,
        };
    },
});


module.exports = multer({ storage });