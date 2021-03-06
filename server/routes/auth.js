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
      user.validPassword(req.body.password, function(err, correct) {
        if (err) throw err;

        if (correct) {
          const payload = {
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
          };

          var token = jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: 86400 });

          res.json({
            success: true,
            message: "Token sent",
            token: token,
            expiresIn: 86400
          });
        } else {
          res.json({ success: false, message: 'Authentication failed: incorrect password.'});
        }
      });
    }
  });
});

module.exports = router;
