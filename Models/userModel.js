

const mongoose = require('mongoose');



const userShecmaRules = {
   
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Passwords do not match"
        }
    },
    createdAt: { type: Date, default: Date.now }
}    

const userSchema = new mongoose.Schema(userShecmaRules);
const UserModel = mongoose.model('UserModel', userSchema);


module.exports = UserModel;