const  verifySignUp = require("../middleware/verifySignUp");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.post("/api/auth/signup",
        [verifySignUp.checkDuplicatedUserEmail],
        controller.signUp
    );

    app.post("/api/auth/signin", controller.signIn);
};