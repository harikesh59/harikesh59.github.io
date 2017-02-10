const User = require('../models/user');

var sharedRoutes = {
  createUser: (validatedData, next) => {
    User.create(validatedData, (err, user) => {
      if (err) return next(err);
      next(null, user);
    });
  },
  findUserByKey: (key, value, next) => {
    User.findOne()
      .where(key, value)
      .exec((err, user) => {
      if (err) return next(err);
      if (!user) return next(new Error('User not found'));
      next(null, user);
    });
  },
  findUserById: (id, next) => {
    sharedRoutes.findUserByKey('id', id, next);
  },
  findUserByUsername: (username, next) => {
    sharedRoutes.findUserByKey('username', username, next);
  },
  findUserByEmail: (email, next) => {
    sharedRoutes.findUserByKey('email', email, next);
  }
}

module.exports = sharedRoutes;
