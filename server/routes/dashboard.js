/**
 * Routes that have to do with a user's dashboard
 */
var express = require('express');
var User = require('../models/user.js');
var auth = require('../middlewares/auth.js');
var router = express.Router();

/**
 * GET the personal information related to the user related to the token
 *
 * Example: GET /dashboard/personal
 * Respone: JSON containing personal information about the user
 */
router.get('/personal', auth, function(req, res) {
  res.status(200).json({
    username: req.body.decoded.username,
    _id: req.body.decoded._id
  });
});

module.exports = router;
