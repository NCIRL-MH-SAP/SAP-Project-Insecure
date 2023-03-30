const controller = require("../controllers/healthCheckDb.controller");

module.exports = function (app) {
    app.get('/api/health-check-db', controller.healthCheckDb);
};