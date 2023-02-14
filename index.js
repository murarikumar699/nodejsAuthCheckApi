require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Setup a default catch-all route that sends back a welcome message in JSON format."
var models = require('./models');
const routes = require('./routes/api');
app.use('/api/v1/',routes)

app.get('/', (req, res) => res.status(200).send({
message: 'Welcome to the beginning of nothingness.',
}));

const port = parseInt(process.env.PORT) || 5000;
app.set('port', port);
console.log("port started on ",port)
models.sequelize.sync().then(function () {
app.listen(port);
});

module.exports = app;