require('dotenv').config();
var express = require('express');
var sequelize = require('../db')
var User = sequelize.import('../models/user');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
router = express.Router();

router.post('/signup', function(req, res) {
    var _name = req.body.user.name;
    var _screenname = req.body.user.screenname;
    var _email = req.body.user.email;
    var _password = req.body.user.password;

    User.create({
        name: _name,
        screenname: _screenname,
        email: _email,
        passwordHash: bcrypt.hashSync(_password, 10)
    })
    .then(
        function signupSuccess(user) {
            var token = jwt.sign({id: user.uid}, process.env.JWT_SECRET, {expiresIn: 60*60*2})
            res.json({
                user: user,
                message: "User created.",
                sessionToken: token
            })
        },

        function signupError(err){
            res.status(500, err.message)
            res.send("error: ", err)
            console.log(err)
        }
    )
})

router.post('/signin', function(req, res) {
    User.findOne({ where: { screenname: req.body.user.screenname }})
    .then(
        function(user) {
            if(user) {
                bcrypt.compare(req.body.user.password, user.passwordHash, function(err, matches) {
                    if(matches) {
                        var token = jwt.sign({id: user.uid}, process.env.JWT_SECRET, {expiresIn: 60*60*2});
                        res.json({
                            user: user,
                            message: "Signed in.",
                            sessionToken: token
                        })
                    } else {
                        res.status(500).send({ error: "Password did not match"});
                        console.log("error: ", err);
                    }
                }) 
            } else {
                res.status(400).send({ error: "Screenname incorrect."})
            }
        },
        function(err) {
            res.status(500).send({ error: "Failed."})
        }
    )
})

module.exports = router;