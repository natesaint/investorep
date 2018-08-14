/**
 * Routes that have to do with logging in
 */
var express = require('express');
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.post('/', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed: user not found.'});
    } else if (user) {
      // Check password match
      console.log(req.body.password);
      user.validPassword(req.body.password, function(err, correct) {
        if (err) throw err;

        console.log(correct);
        if (correct) {
          const payload = {
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          };

          var token = jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 86400 });

          res.json({
            success: true,
            message: "Token sent",
            token: token
          });
        } else {
          res.json({ success: false, message: 'Authentication failed: incorrect password.'});
        }
      });
    }
  });
});

module.exports = router;
