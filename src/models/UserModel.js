const {Schema, model} = require('mongoose');

// Define the schema


const userSchema = Schema({
    name:{
        type: String,
    },
    lastname:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    }
},{
    collection: 'users'
});

module.exports = model('User', userSchema);