/**
 * Routes that have to do with any kind of config/testing/misc. requests
 */
var express = require('express');
var router = express.Router();

/**
 * GET request used for testing the database
 *
 * Example: /
 *
 * Response: Returns general information about the api
 *
 *     {
 *       "application-name": "investorep-api",
 *       "author": "Nathen St. Germain",
 *       "version": "x.x.x"
 *     }
 */
router.get('/', function(req, res, next) {
  res.status(200).json({
    "application-name": "investorep-api",
    "author": "Nathen St. Germain",
    "version": "1.0.0"
  });
});

module.exports = router;
