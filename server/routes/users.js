/**
 * Routes that have to do with users and accounts
 */
var express = require('express');
var User = require('../models/user.js');
var router = express.Router();

/**
 * GET all users in the database
 *
 * Example: GET /api/users
 * Response:
 * All user objects in db displayed with this format
 *     {
 *         username: "username",
 *         name: "name",
 *         email: "email"
 *     }
 */
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) throw err;
    res.status(200).send(users);
  });
});

/**
 * POST a new user to the database
 *
 * Paramaters:
 *     name: name of users
 *     username: username for user (unique)
 *     email: email of user (unique)
 *     password: password for account to be hashed
 *
 * Example: POST /api/users
 * Response:
 * Status code: 409 - duplicate user (already exists)
 *              200 - OK
 *                  JSON object of added user is returned
 */
router.post('/', function(req, res) {
  let user = new User ({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  user.save(function(err) {
    if (err && err.code === 11000) {
      // Conflict
      res.status(409).send({
        "error": "Username or email already exists"
      });
    } else if (err) {
      throw err;
    } else {
      res.status(200).send(user);
      console.log('User saved');
    }
  });
});

/**
 * DELETE a user from the database based on their _id
 *
 * Example: DELETE /api/users
 * Response:
 * Status code: 200 - OK. User found and deleted
 */
router.delete('/:user_id', function(req, res) {
  User.remove({_id: req.params.user_id}, function(err) {
    if (err) throw err;
    res.status(200).send({
      "message": "User deleted"
    });
    console.log('User deleted');
  });
});

module.exports = router;
