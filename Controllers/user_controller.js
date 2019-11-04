const User = require("../Models/User");

module.exports = {
    getUser(req, res) {
        res.send(req.user);
    },
    addUser(req, res) {
        var body = _.pick(req.body, ['name', 'email', 'password']);
        console.log("Add User");
        var user = new User(body);
        user.save().then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
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
                    res.header('x-auth', token).send(user);
                });
            })
            .catch(e => {
                res.status(400).send();
            });
    },
    logoutUser(req, res) {
        req.user.removerToken(req.token).then(() => {
            res.status(200).send();
        }, () => {
            res.status(400).send();
        });
    }
};