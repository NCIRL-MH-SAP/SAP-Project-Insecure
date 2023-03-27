const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.get('/api/users', controller.get)
    app.post("/api/users", controller.post)
    app.put("/api/users", controller.put)
    app.delete("/api/users/:id", controller.delete)
};