const db = require('../database/models/index');
var dbUrl = process.env.DATABASE_URL

exports.healthCheckDb = async (req, res) => {
    db.sequelize.authenticate().then(() => {
        res.send({ status: "db online", dbUrl: dbUrl });
    }).catch(err => {
        console.log(err);
        res.send("error when trying to connect to db");
    });
};