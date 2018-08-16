var express = require('express');
var jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) { // Token
    jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
      if (err) {
        console.log('No token found');
        return res.status(403).send({
          success: false,
          message: 'Failed to authenticate token'
        });
      } else {
        console.log('Token authenticated');
        req.body.decoded = decoded;
        next();
      }
    });
  } else { // No token
    console.log('No token found');
    return res.status(403).send({
        success: false,
        message: 'No token found'
    });
  }
}

module.exports = isAuthenticated;
