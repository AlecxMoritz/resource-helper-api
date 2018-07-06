const jwt = require('jsonwebtoken');
const sequelize = require('../db');
var User = sequelize.import('../models/user.js');

module.exports = function(req, res, next) {
    if(req.method == 'OPTIONS') {
        next();
    } else {
        var sessionToken = req.headers.authorization;
        if (!sessionToken) return res.status(400).send({ auth: false, message: "No token provided."});
        else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
                if (decoded) {
                    User.findOne({ where: { uid: decoded.id }}).then(user => {
                        req.user = user;
                        next()
                    },
                    function() {
                        res.status(401).send({ error: "not authorized" });
                    })
                } else {
                    res.status(400).send({ error: "not authorized" });
                }
            })
        }
    }
}