const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const  verifySignUp = require("./middleware/verifySignUp");

app.use(express.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 1000000
}));
app.use(express.json({ limit: '1mb' }));

console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/mh-sap-project'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/mh-sap-project/index.html'));
});

app.get('/hello', (req, res) => {
    res.send('Hello World!')
});

var dbUrl = process.env.DATABASE_URL
console.log(dbUrl)

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbUrl) // Example for postgres
const Op = Sequelize.Op;
app.get('/testdb', function (req, res) {

    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
        res.send("connected");
    }).catch(err => {
        console.log(err);
        res.send("error when trying to connect");
    });

});

const db = require('./database/models/index');
const User = db.User;
app.get('/api/users', (req, res) => {
    User.findAll({
        order: [['createdAt', 'ASC']]
    })
        .then((r) => {
            res.send(r);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

})

app.post("/api/users", (req, res) => {
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
})

app.put("/api/users", (req, res) => {
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
})


app.delete("/api/users/:id", (req, res) => {
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
})

app.post("/api/auth/signin", (req, res) => {

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
                return res.status(404).send({ message: "Invalid user credential" });
            }

            var passwordIsValid = req.body.password === user.password;

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid user credential"
                });
            }
            res.send({
                id: user.id,
                username: user.firstName + " " + user.lastName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

app.post("/api/auth/signup", [verifySignUp.checkDuplicatedUserEmail], (req, res) => {

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
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`webapp listening on port --> ${port}`)
});