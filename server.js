
const express = require('express');
const app = express();
const path = require('path');

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/mh-sap-project'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/mh-sap-project/index.html'));
});

app.get('/hello', (req, res) => {
    res.send('Hello World!')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`webapp listening on port --> ${port}`)
});