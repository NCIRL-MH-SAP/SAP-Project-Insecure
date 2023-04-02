const db = require("../database/models");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = db.User;
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

exports.signIn = async (req, res) => {
    if (!(req.body.email && req.body.password)) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    User.findOne({
        where: {
            email: { [Op.iLike]: req.body.email }
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "Invalid user credentials" });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid user credentials"
                });
            }

            var token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin ?? false },
                config.secret,
                {
                    expiresIn: 86400 // 24 hours
                });

            res.send({
                id: user.id,
                username: user.firstName + " " + user.lastName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signUp = (req, res) => {

    if (!(req.body.firstName && req.body.lastName && req.body.email && req.body.password)) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        salary: 50000,
        bonus: 10000,
        active: true,
        password: bcrypt.hashSync(req.body.password, Number(process.env.HASH_SALT))
    })
        .then(user => {
            res.send({ message: "User was registered successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.accountUpdatePassword = (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send({ message: "'Id' parameter should not be empty" });
    }
    if (!(req.body.password)) {
        return res.status(400).send({ message: "'Password' parameter should not be empty" });
    }

    User.findOne({
        where: {
            id: userId
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }

            User.update(
                {
                    password: bcrypt.hashSync(req.body.password, Number(process.env.HASH_SALT))
                },
                {
                    where: {
                        id: userId
                    }
                }
            )
                .then(() => {
                    res.send({ message: "Password was updated successfully" });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};