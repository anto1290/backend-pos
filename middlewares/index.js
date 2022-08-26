const { getToken, policyFor } = require("../utils")
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../app/user/model");

function decodeToken() {
    return async (req, res, next) => {
        try {
            let token = getToken(req);
            if (!token) return next();
            req.user = jwt.verify(token, config.SECRET_KEY);

            let user = await User.findOne({ token: { $in: [token] } }).select("-password -token");
            if (!user) {
                res.json({
                    error: 1,
                    message: "Token is invalid"
                })
            }
        } catch (error) {
            if (error && error.name === "JsonWebTokenError") {
                return res.json({
                    error: 1,
                    message: error.message
                })
            }
            next(error);
        }
        return next();
    }
}
// middlerware for check user permission
function checkPermission(action, subject) {
    return (req, res, next) => {
        let policy = policyFor(req.user);
        if (!policy.can(action, subject)) {
            return res.json({
                error: 1,
                message: `You don't have permission to do this action ${action} ${subject}`
            })
        }
        next();
    }
}

module.exports = { decodeToken, checkPermission };