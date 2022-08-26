const User = require('../user/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { getToken } = require('../../utils');
const register = async (req, res, next) => {
    try {
        const payload = req.body;
        const user = new User(payload);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        if (error && error.name === 'ValidationError') {
            res.status(400).json({
                error: 1,
                message: error.message,
                fields: error.errors
            });
        }
        next(error);
    }
}

const localStrategy = async (email, password, done) => {
    try {
        const user = await User.findOne({ email }).select('-__v -createdAt -updatedAt -cart_items -token');
        if (!user) return done();
        if (bcrypt.compareSync(password, user.password)) {
            ({ password, ...userWithoutPassword } = user.toObject());
            return done(null, userWithoutPassword);
        }
    } catch (error) {
        done(error);
    }
    done();
}

const login = async (req, res, next) => {
    passport.authenticate('local', async (error, user) => {
        if (error) return next(error);
        if (!user) return res.status(401).json({ error: 1, message: 'Invalid email or password' });
        let signed = jwt.sign(user, config.SECRET_KEY);
        await User.findByIdAndUpdate(user._id, { $push: { token: signed } });
        res.json({
            message: 'Login success',
            user,
            token: signed
        });
    })(req, res, next)
}

const logout = async (req, res, next) => {
    let token = getToken(req);
    let user = await User.findOneAndUpdate({ token: { $in: [token] } }, { $pull: { token: token } }, { useFindAndModify: false });
    if (!token || !user) {
        res.json({
            error: 1,
            message: 'Token & User is invalid'
        });
    }
    return res.json({
        error: 0,
        message: 'Logout success'
    });
}

const me = (req, res, next) => {
    if (!req.user) {
        res.json({
            error: 1,
            message: 'User is invalid'
        });
    }
    res.json(req.user);
}

module.exports = {
    register,
    localStrategy,
    login,
    logout,
    me
}