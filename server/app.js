var express = require('express');
var bodyParser = require('body-parser');

var index = require('./routes/index.js');
var users = require('./routes/users.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Link routes with respective modules
app.use('/', index);
app.use('/users', users);

var server = app.listen(3000, function() {
        console.log("Running api on port: " + server.address().port);
});
