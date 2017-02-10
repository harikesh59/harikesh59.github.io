const shared = require('./shared');

var Controller = {
  getRegister: (req, res, next) => {
    if (!req.session.user)
      res.render('register');

    res.redirect('/');
  },

  postRegister: (req, res, next) => {
    if (!req.session.user) {
      shared.createUser(req.body, (err, user) => {
        if (err) return next(err);
        req.session.user = user;
        res.redirect('/');
      });
    }
    else{
      res.redirect('/');
    }
  },

  getLogin: (req, res, next) => {
    if (!req.session.user)
      res.render('login');
    else
      res.redirect('/');
  },

  postLogin: (req, res, next) => {
    if (!req.session.user) {
      let username = req.body.username || req.query.username;
      shared.findUserByUsername(username, (err, user) => {
        if (err) return next(err);
        req.session.user = user;
        res.redirect('/');
      });
    }
    else{
      res.redirect('/');
    }
  },

  getLogout: (req, res, next) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }
};

module.exports = Controller;
