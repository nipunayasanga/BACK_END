const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    contact:{
        type:String,
        required: true
    },
    userID:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
 




});

module.exports = mongoose.model('User', userSchema)

