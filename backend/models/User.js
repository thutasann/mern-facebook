const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    },
    bio:{
        type: String,
        trim: true
    },
}, { timestamps: true } );

module.exports = model('user', userSchema);