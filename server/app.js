var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index.js');
var users = require('./routes/users.js');
var auth = require('./routes/auth.js');
var dashboard = require('./routes/dashboard.js');
var stocks = require('./routes/stocks.js');

var authMiddleware = require('./middlewares/auth.js');

let prefix = '/api';
require('dotenv').config();
var app = express();
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Link routes with respective modules
app.use(prefix + '/', index);
app.use(prefix + '/users', users);
app.use(prefix + '/auth', auth);
app.use(prefix + '/dashboard', dashboard);
app.use(prefix + '/stocks', stocks);

var server = app.listen(3000, function() {
        console.log('Running api on port: ' + server.address().port + ', access at /api/*');
});
