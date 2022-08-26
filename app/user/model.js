const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema, model } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        maxlength: [50, 'Full name must be less than 50 characters'],
        minlength: [3, 'Full name must be at least 3 characters']
    },
    customerId: {
        type: Number
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        maxlength: [255, 'Email must be less than 50 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [255, 'Password must be less than 50 characters']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    token: [String]
}, { timestamps: true });

userSchema.path('email').validate((val) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, attr => `${attr.value} is not a valid email`);

userSchema.path('email').validate(async (value) => {
    try {
        const count = await User.countDocuments({ email: value });
        return !count;
    } catch (error) {
        throw error;

    }
}, attr => `${attr.value} is already in use`);
const HASH_ROUNDE = 10;
userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUNDE);
    next();
});
userSchema.plugin(AutoIncrement, { inc_field: 'customerId' });
const User = model('User', userSchema);
module.exports = User;