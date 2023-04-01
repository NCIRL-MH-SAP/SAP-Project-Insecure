const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(express.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 1000000
}));
app.use(express.json({ limit: '1mb' }));

console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}
else if (!process.env.DISABLE_HTTPS) {
    const sts = require('strict-transport-security');
    const globalSTS = sts.getSTS({ 'max-age': { 'days': 30 } });
    app.use(globalSTS);

    const referrerPolicy = require('referrer-policy')
    app.use(referrerPolicy({ policy: 'same-origin' }))

    var xFrameOptions = require('x-frame-options')
    app.use(xFrameOptions())

    app.disable('x-powered-by');

    app.use(function (req, res, next) {
        res.setHeader(
            'Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'; connect-src 'self'; frame-src 'self"
        );

        next();
    });

    var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
    const ignoreHosts = [];
    const ignoreRoutes = [];
    app.use(redirectToHTTPS(ignoreHosts, ignoreRoutes));
}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/healthCheck.routes')(app);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/mh-sap-project'));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/mh-sap-project/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`webapp listening on port --> ${port}`)
});