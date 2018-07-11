var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes.js');

var app = express();

// Accept JSON and URL encoded parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes
routes(app);

var server = app.listen(3000, function() {
        console.log("Running api on port: " + server.address().port);
});
