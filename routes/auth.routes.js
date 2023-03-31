const verifySignUp = require("../middleware/verifySignUp");
const controller = require("../controllers/auth.controller");
const authJwt = require("../middleware/authJwt");

module.exports = function (app) {
    app.post("/api/auth/signup", [verifySignUp.checkDuplicatedUserEmail], controller.signUp);
    app.post("/api/auth/signin", controller.signIn);
    app.put("/api/auth/update/password/:id", [authJwt.verifyToken], controller.accountUpdatePassword);
};