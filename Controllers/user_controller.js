const {User} = require("../Models/User");
const _ = require("lodash");
const bcrypt = require('bcryptjs');


module.exports = {
    getUser(req, res) {
        res.send(req.user);
    },
    addUser(req, res) {
        var body = _.pick(req.body, ['name', 'email', 'password']);
        var user = new User(body);
        user.save().then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header('authToken', token).send(user);
            console.log(user);
        }).catch((e) => {
            res.status(400).send(e);
        });
    },
    loginUser(req, res) {
        var body = _.pick(req.body, ['email', 'password']);
        User.findByCredentials(body.email, body.password)
            .then(user => {
                return user.generateAuthToken().then((token) => {
                    res.header('authToken', token).send(user);
                });
            })
            .catch(e => {
                res.status(400).send();
            });
    },
    logoutUser(req, res) {
        console.log("Controller TOKEN: ", req.token);
        req.user.removeToken(req.token).then(() => {
            res.status(200).send();
        }, () => {
            res.status(400).send();
        });
    }
};