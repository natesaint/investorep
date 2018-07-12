/**
 * Routes that have to do with users and accounts
 */
var express = require('express');
var Users = require('../models/users.js');
var router = express.Router();

/**
 * GET all users in the database
 *
 * Example: /api/users
 */
router.get('/', function(req, res, next) {
  res.status(200).send({
    "name": "jeff"
  });
});

module.exports = router;
