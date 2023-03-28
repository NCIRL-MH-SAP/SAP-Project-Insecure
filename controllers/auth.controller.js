const db = require("../database/models");
const User = db.User;
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

exports.signIn = async (req, res) => {
    if (!(req.body.email && req.body.password)) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    userRows = await db.sequelize.query('SELECT id, "firstName", "lastName", "email", "password" FROM public."Users" where "Users".email like \'' + req.body.email + '%\' limit 1;', {
        type: db.sequelize.QueryTypes.SELECT
    });

    if (userRows.length == 1) {       
        const user = userRows[0];
        var passwordIsValid = req.body.password === user.password;

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid user credential"
            });
        }

        return res.send({
            id: user.id,
            username: user.firstName + " " + user.lastName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
    }

    return res.status(404).send({ message: "Invalid user credential" });

    // User.findOne({
    //     where: {
    //         email: { [Op.iLike]: req.body.email }
    //     }
    // })
    //     .then(user => {
    //         if (!user) {
    //             return res.status(404).send({ message: "Invalid user credential" });
    //         }

    //         var passwordIsValid = req.body.password === user.password;

    //         if (!passwordIsValid) {
    //             return res.status(401).send({
    //                 accessToken: null,
    //                 message: "Invalid user credential"
    //             });
    //         }
    //         res.send({
    //             id: user.id,
    //             username: user.firstName + " " + user.lastName,
    //             firstName: user.firstName,
    //             lastName: user.lastName,
    //             email: user.email
    //         });
    //     })
    //     .catch(err => {
    //         res.status(500).send({ message: err.message });
    //     });
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
        password: req.body.password
    })
        .then(user => {
            res.send({ message: "User was registered successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};