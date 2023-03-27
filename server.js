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

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/mh-sap-project'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/mh-sap-project/index.html'));
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`webapp listening on port --> ${port}`)
});