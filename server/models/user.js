/**
 * Handles CRUD operations and represents the mongoose Schema relating
 * to 'user' data
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

// Create the user schema
var UserSchema = new Schema({
  name: String,
  email: {type: String, required: true, unique: true, index: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  created_date: Date,
  updated_date: Date
});

/**
 * Executes before saving to the database
 *
 * Hash the password the user provides
 */
UserSchema.pre('save', function(next) {
  var user = this;
  // Exit if the password has been previously modified
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});

/**
 * Check if the password is valid
 *
 * @return bool
 */
UserSchema.methods.validPassword = function(password) {
  bcrypt.hash(password, this.salt, function(err, hash) {
    if (err) throw err;
    return this.password === hash;
  });
}

// Create and export User model
var User = mongoose.model('User', UserSchema);
module.exports = User;
