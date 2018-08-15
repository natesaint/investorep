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
 *         _id: "id",
 *         username: "bob",
 *         firstName: "Robert",
 *         lastName: "Bobson",
 *         email: "bob@email.com"
 *     }
 */
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) throw err;
    res.status(200).send(users);
  });
});

/**
 * GET a specific user in the database by username
 *
 * Example: GET /api/users/bob
 * Response:
 * Returns JSON of user matching the username or nothing if no match
 *     {
 *         _id: "id",
 *         username: "bob",
 *         firstName: "Robert",
 *         lastName: "Bobson",
 *         email: "bob@email.com"
 *     }
 */
router.get('/:username', function(req, res) {
  User.findOne({username: req.params.username}, function(err, user) {
    if (err) throw err;
    res.status(200).send(user);
  });
});

/**
 * Update user password, indentified by id
 *
 * Example: PUT /api/users/1234
 * Response:
 * Returns JSON of user that was updated
 *     {
 *         _id: "id",
 *         username: "username",
 *         firstName: "firstName",
 *         lastName: "lastName",
 *         email: "email"
 *     }
 */
router.put('/:user_id', function(req, res) {
  User.findByIdAndUpdate(req.params.user_id, req.body, function(err, user) {
    if (err) throw err;
    res.status(200).send(user);
  });
});

/**
 * POST a new user to the database
 *
 * Paramaters:
 *     firstName: first name of users
 *     lastName: last name of user
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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  user.save(function(err) {
    if (err && err.code === 11000) {
      // Conflict
      console.log('error saving user');
      res.status(401).send({
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
      "success": true
    });
    console.log('User deleted');
  });
});

module.exports = router;
