const db = require('../database/models/index');

exports.healthCheckDb = async (req, res) => {
    db.sequelize.authenticate().then(() => {
        res.send({ status: "db online" });
    }).catch(err => {
        console.log(err);
        res.send("error when trying to connect to db");
    });
};