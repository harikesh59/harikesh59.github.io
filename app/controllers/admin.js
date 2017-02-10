const Admin = require('../models/admin');

let getResponseData = (data) => {
  return Object.assign({}, { data: data });
};

var Controller = {
  getLogin: (req, res, next) => {
    if (!req.session.admin)
      res.render('admin_login');
    else
      res.redirect('/admin');
  },

  postLogin: (req, res, next) => {
    if (!req.session.admin) {
      let username = req.body.username || req.query.username;
      let password = req.body.password || req.query.password;
      console.log(username);

      Admin.findOne({username: username}, (err, admin) => {
        if (err) return next(err);

        if(!admin) return next(new Error('No admin found'));

        admin.comparePassword(password, (err, isMatched) => {
          if (err) return next(err);

          if (!isMatched) return next(new Error('Invalid Password'));

          req.session.admin = admin.id;
          res.redirect('/admin');
        });
      });
    }
    else{
      res.redirect('/admin');
    }
  },

  home: (req, res, next) => {
    if (!req.session.admin)
      res.redirect('/admin/login')
    else
      res.render('admin_home');
  },

  token: (req, res, next) => {

    let username = req.body.username || req.query.username;
    let password = req.body.password || req.query.password;

    Admin.findOne({username: username}, (err, admin) => {
      if (err) return next(err);

      if(!admin) return next(new Error('No admin found'));

      admin.comparePassword(password, (err, isMatched) => {
        if (err) return next(err);

        if (!isMatched) return next(new Error('Invalid Password'));

        const token = admin.getJWTToken();
        res.status(200).json(getResponseData({token}));
      });
    });
  },

  getLogout: (req, res, next) => {
    req.session.destroy(() => {
      res.redirect('/admin/login');
    });
  }
};

module.exports = Controller;
