const controller = require("../controllers/user.controller");
const  authJwt  = require("../middleware/authJwt");

module.exports = function (app) {
    app.get('/api/users/:id', [authJwt.verifyToken], controller.getById)
    app.get('/api/users', [authJwt.verifyToken], controller.get)
    app.post("/api/users", [authJwt.verifyToken], controller.post)
    app.put("/api/users", [authJwt.verifyToken], controller.put)
    app.delete("/api/users/:id", [authJwt.verifyToken], controller.delete)
};