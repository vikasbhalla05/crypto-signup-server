const mongoose = require('mongoose');
const { Schema } = mongoose;

let userSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('cryptoUser', userSchema);
