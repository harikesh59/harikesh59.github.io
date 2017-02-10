const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const util = require('util');
const config = require('config');

const Story = require('./story');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  first_name: {
    type: String,
    required: true,
    lowercase: true
  },
  last_name: {
    type: String,
    required: true,
    lowercase: true
  },
  joined_on: {
    type: Date,
    default: Date.now
  },
  is_anonymous: {
    type: Boolean,
    default: false,
    requred: true
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  followings: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  following_stories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Story'
  },
  last_location: {
    type: mongoose.Schema.Types.Mixed
  }
});

const SALT_WORK_FACTOR = 10;
UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.virtual('full_name').get(function() {
  if (this.is_anonymous) return "anonymous";
  else return this.first_name + " " + this.last_name;
});

UserSchema.methods.comparePassword = function(password, userPassword, cb){
  bcrypt.compare(password, userPassword, (err, isMatched) => {
    if (err) return cb(err);
    cb(null, isMatched);
  });
}

UserSchema.methods.getJWTToken = function(){
  return jwt.encode({ id: this.id }, config.secret);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
