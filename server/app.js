var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index.js');
var users = require('./routes/users.js');
var login = require('./routes/login.js');

require('dotenv').config();
var app = express();
mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Link routes with respective modules
app.use('/', index);
app.use('/users', users);
app.use('/login', login);

var server = app.listen(3000, function() {
        console.log("Running api on port: " + server.address().port);
});
