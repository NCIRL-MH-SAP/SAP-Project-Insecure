require('dotenv').config();

var dbUrl = process.env.DATABASE_URL

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbUrl)

exports.healthCheckDb = (req, res) => {
    sequelize.authenticate().then(() => {
        res.send({ status: "db online", dbUrl: dbUrl });
    }).catch(err => {
        console.log(err);
        res.send("error when trying to connect to db");
    });
};