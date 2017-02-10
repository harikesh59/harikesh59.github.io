const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const util = require('util');
const config = require('config');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
    required: true
  }
});

const SALT_WORK_FACTOR = 10;
AdminSchema.pre('save', function(next) {
  var admin = this;

  if (!admin.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(admin.password, salt, (err, hash) => {
      if (err) return next(err);

      admin.password = hash;
      next();
    });
  });
});

AdminSchema.methods.comparePassword = function(password, cb){
  bcrypt.compare(password, this.password, (err, isMatched) => {
    if (err) return cb(err);
    cb(null, isMatched);
  });
}


AdminSchema.methods.getJWTToken = function(){
  return jwt.encode({ id: this.id }, config.secret);
}

const Admin = mongoose.model('Admin', AdminSchema);

Admin.remove({}, (err) => {
  if (err) console.log(err);
  console.log('Admin removed');
  Admin.create(config.Admin, (err, admin) => {
    if (err) return console.log(err);
    console.log('Admin created');
    // console.log(admin);
  });
});


module.exports = Admin;
