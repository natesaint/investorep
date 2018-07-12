/**
 * Handles CRUD operations with the database relating to 'users' data
 */
//var db = require('../db')
var crypto = require('crypto')

function hash(password) {
  return crypto.createHash('sha1').update(password).digest('base64')
}

/**
 * Create a new user
 */
exports.create = (name, email, password) {
  let user = {
    "name": name,
    "email", email,
    "password", hash(password)
  }

  //db.save(user, cb)
}
