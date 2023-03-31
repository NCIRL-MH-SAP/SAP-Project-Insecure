const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {

    var authHeader = req.headers["authorization"];
    var token;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7, authHeader.length);
    } else {
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;