const db = require('../database/models/index');
const User = db.User;

exports.get = (req, res) => {
    User.findAll({
        order: [['createdAt', 'ASC']]
    })
        .then((r) => {
            res.send(r);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.post = (req, res) => {
    console.log(req.body)

    if (!(req.body.firstName && req.body.lastName && req.body.email)) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        salary: req.body.salary,
        bonus: req.body.bonus,
        // password: bcrypt.hashSync(req.body.password, 8)    
    })
        .then(user => {
            res.send({ message: "User was created successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.put = (req, res) => {
    console.log(`req.body.id: ${req.body.id}`)
    console.log(req.body)
    const userId = req.body.id;
    if (!userId) {
        return res.status(400).send({ message: "'Id' should be not empty." });
    }
    if (!(req.body.firstName && req.body.lastName && req.body.email)) {
        return res.status(400).send({ message: "Mandatory fields not provided" });
    }

    User.update(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            salary: req.body.salary,
            bonus: req.body.bonus,
            active: req.body.active,
        },
        {
            where: {
                id: userId
            }
        }
    ).then(() => {
        res.send({ message: "User was updated successfully" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.delete = (req, res) => {
    console.log(`req.body.id: ${req.params.id}`)
    console.log(req.params)
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send({ message: "'Id' should be not empty." });
    }

    User.destroy(
        {
            where: {
                id: userId
            }
        }
    ).then(() => {
        res.send({ message: "User was deleted successfully" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};