const User = require('../models/user');

var Controller = {
  index: (req, res, next) => {
    if (req.session.user){
      User.findOne({ _id: req.session.user }, (err, user) => {
        if (err) return next(err);
        if (!user) {
          req.session.destroy(() => {
            return res.redirect('/');
          });
        }
        else{
          res.render('home', { user: user });
        }
      });
    }
    else{
      res.render('index');
    }
  },
  profile: (req, res, next) => {
    if (req.session.user){
      User.findOne({ _id: req.params.user_id }, (err, user) => {
        if (err) return next(err);
        res.render('profile', { user, logged_in_user: req.session.user });
      });
    }
    else{
      res.render('index');
    }
  },
};

module.exports = Controller;
