const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 1000000
}));
app.use(express.json({ limit: '1mb' }));

console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);

require('dotenv').config();

//TODO: Remove this on secure version
if (process.env.NODE_ENV !== 'production_WITH_TYPO') {
    app.use(cors());
}

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/mh-sap-project'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/mh-sap-project/index.html'));
});

var dbUrl = process.env.DATABASE_URL
console.log(dbUrl)
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbUrl) 
app.get('/health-check-db', function (req, res) {
    sequelize.authenticate().then(() => {
        res.send({status: "online", dbUrl: dbUrl});
    }).catch(err => {
        console.log(err);
        res.send("error when trying to connect to db");
    });
});

app.get('/getDbInfo',);

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`webapp listening on port --> ${port}`)
});