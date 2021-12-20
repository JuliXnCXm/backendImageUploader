const {Schema , model} = require('mongoose');

//create schema
const photoSchema = Schema({
    photoname: {
        type: String,
    },
    originalname: {
        type: String,
    },
    path: {
        type: String,
    },
    mimetype: {
        type: String,
    },
    size: {
        type: Number,
    },
    created: {
        type: Date, default : Date.now
    },
    user_id: {
        type: String,
    }

},{
    collection: 'photos'
})


module.exports = model('Photo', photoSchema);
