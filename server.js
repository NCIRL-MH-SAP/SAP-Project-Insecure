
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

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
app.get('/api/users', (req,res)=> {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`webapp listening on port --> ${port}`)
});